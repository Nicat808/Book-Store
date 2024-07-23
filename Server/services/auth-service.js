const pool = require("../config/db");
const userService = require("../services/user-service");
const { ErrorResult, SuccessResult } = require("../utils/results/result");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AccessToken = require("../utils/auth/access-token");
const UserLoginDTO = require("../models/user/userLoginDTO");
const {
  USER_DOES_NOT_EXIST,
  PASSWORD_INCORRECT,
  USER_LOGIN_SUCCESSFUL,
  USER_REGISTER_SUCCESSFUL,
} = require("../utils/constants/user-messages");
const userRegisterDTO = require("../models/user/userRegisterDTO");
/**
 * @param {UserLoginDTO} userloginDto
 */

const loginUser = async (userLoginDto) => {
  const userExistingResult = await userService.getUserByUsername(
    userLoginDto.username
  );
  if (!userExistingResult.data) return new ErrorResult(USER_DOES_NOT_EXIST);
  const passwordCheckingResult = await bcrypt.compare(
    userLoginDto.password,
    userExistingResult.data.password
  );
  if (!passwordCheckingResult) return new ErrorResult(PASSWORD_INCORRECT);
  const token = await jwt.sign(
    { username: userExistingResult.data.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  const accessToken = new AccessToken(token, expireDate.toString());
  return new SuccessResult(USER_LOGIN_SUCCESSFUL, accessToken);
};
/**
 * @param {userRegisterDTO} userRegisterDto
 */

const registerUser = async (userRegisterDto) => {
  const newUser = await userService.addUser(userRegisterDto);
  if(!newUser.success){
    return newUser
  }
  const userToken = jwt.sign(
    { username: userRegisterDto.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return new SuccessResult(USER_REGISTER_SUCCESSFUL, { newUser, userToken });
};

module.exports = {
  loginUser,
  registerUser,
};
