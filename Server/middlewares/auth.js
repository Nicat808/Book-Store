const jwt = require("jsonwebtoken");
const responseGenerator = require("../utils/responseGenerator");
const statusCodes = require("../utils/constants/responseStatus");

const authenticateUser = (req, res, next) => {
  const authenticationHeader = req.headers.authorization;
  const token = authenticationHeader && authenticationHeader.split(" ")[1];

  if (!token) {
    return responseGenerator(res, "Not Allowed", statusCodes.UNAUTHORIZED);
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      responseGenerator(res, "Not Allowed", statusCodes.UNAUTHORIZED);
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authenticateUser;
