const authService = require("../services/auth-service");
const UserLoginDTO = require("../models/user/userLoginDTO");
const UserRegisterDTO = require("../models/user/userRegisterDTO");
const responseGenerator = require("../utils/responseGenerator");
const { ErrorResult } = require("../utils/results/result");
const statusCodes = require("../utils/constants/responseStatus");

const loginUser = async (req, res) => {
  try {
    const userLoginDTO = new UserLoginDTO(req.body);
    const result = await authService.loginUser(userLoginDTO);
    if (!result.success) {
      responseGenerator(res, result, statusCodes.BAD_REQUEST);
    } else {
      responseGenerator(res, result);
    }
  } catch (error) {
    console.log(error);
    responseGenerator(
      res,
      new ErrorResult(error.message),
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
const registerUser = async (req, res) => {
  try {
    const userRegisterDTO = new UserRegisterDTO(req.body);
    const result = await authService.registerUser(userRegisterDTO);
    if (!result.success) {
      responseGenerator(res, result, statusCodes.BAD_REQUEST);
    } else {
      responseGenerator(res, result);
    }
  } catch (error) {
    console.log(error);
    responseGenerator(
      res,
      new ErrorResult(error.message),
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  loginUser,
  registerUser,
};
