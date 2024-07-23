const booksService = require("../services/book-service");
const BookAddDTO = require("../models/book/bookAddDTO");
const BookUpdateDTO = require("../models/book/bookUpdateDTO");
const responseGenerator = require("../utils/responseGenerator");
const statusCodes = require("../utils/constants/responseStatus");
const { ErrorResult } = require("../utils/results/result");
const BookDeleteDTO = require("../models/book/bookDeleteDTO");

const getAllBooks = async (req, res) => {
  try {
    const result = await booksService.getAllBooks();
    responseGenerator(res, result);
  } catch (error) {
    console.log(error)
    responseGenerator(
      res,
      new ErrorResult(error.message),
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
const getOneBook = async (req, res) => {
  try {
    const result = await booksService.getOneBook(req.params.id);
    responseGenerator(res, result);
  } catch (error) {
    console.log(error);
    responseGenerator(
      res,
      new ErrorResult(error.message),
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
const addBook = async (req, res) => {
  try {
    const bookAddDTO = new BookAddDTO(req.body);
    const result = await booksService.addBook(bookAddDTO);
    responseGenerator(res, result, statusCodes.CREATED);
  } catch (error) {
    console.log(error);
    responseGenerator(
      res,
      new ErrorResult(error.message),
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
const updateBook = async (req, res) => {
  try {
    const bookUpdateDTO = new BookUpdateDTO(req.body);
    const result = await booksService.updateBook(bookUpdateDTO);
    responseGenerator(res, result);
  } catch (error) {
    console.log(error);
    responseGenerator(
      res,
      new ErrorResult(error.message),
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
const deleteBook = async (req, res) => {
  try {
    const result = await booksService.deleteBook(req.params.id);
    responseGenerator(res, result);
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
  getAllBooks,
  getOneBook,
  addBook,updateBook,deleteBook
};
