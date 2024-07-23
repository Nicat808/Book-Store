const pool = require("../config/db");
const {
  DATA_LISTED_SUCCESSFULLY,
  DATA_ADDED_SUCCESSFULLY,
} = require("../utils/constants/messages");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const bcrypt = require("bcrypt");
const UserValidation = require("../utils/validations/user");

const getUserByUsername = async (username) => {
  const res = await pool.query("select * from users u where u.username = $1", [
    username,
  ]);
  return new SuccessResult(DATA_LISTED_SUCCESSFULLY, res.rows[0]);
};
const checkDuplicateUser = async (user) => {
  const isExistingData = await getUserByUsername(user.username);
  if (isExistingData.data) {
    return new ErrorResult();
  }
  return new SuccessResult();
};
const addUser = async (user) => {
  const validator = new UserValidation(user);
  const validationResult = validator.validate();
  if (!validationResult.isValid)
    return new ErrorResult(validationResult.toString());
  
  const businessResult = await checkDuplicateUser(user);
  if (!businessResult.success) return businessResult;

  user.password = await bcrypt.hash(user.password, +process.env.SALT_KEY);
  const res = await pool.query(
    "insert into users (username,password) values ($1,$2) returning * ",
    [user.username, user.password]
  );
  return res.rows[0]
};
module.exports = {
  getUserByUsername,
  checkDuplicateUser,
  addUser,
};
