const responseStatus = require('../utils/constants/responseStatus');
/**
 * Generates a response.
 * 
 * @param {import('express').Response} res - The response object from Express.
 * @param {Object} data - The data to be sent in the response.
 * @param {number} [statusCode=responseStatus.OK] - The status type of response.
 * @returns {Object} - The JSON response.
 */

const responseGenerator = (res,data,statusCode = responseStatus.OK) =>{
    return res.status(statusCode).json(data)
}

module.exports = responseGenerator