const pool = require("../config/db");
const Book = require("../models/book/book");
const {
  DATA_ADDED_SUCCESSFULLY,
  DATA_LISTED_SUCCESSFULLY,
  DATA_DELETED_SUCCESSFULLY,
  DATA_UPDATED_SUCCESSFULLY,
} = require("../utils/constants/messages");
const { SuccessResult } = require("../utils/results/result");


const getAllBooks = async () => {
  const result = await pool.query("select * from books");
  return new SuccessResult(DATA_LISTED_SUCCESSFULLY, Book.mapAll(result.rows));
};
const getOneBook = async (id) => {
  const result = await pool.query("select * from books b where b.id = $1", [
    id,
  ]);
  return new SuccessResult(
    DATA_LISTED_SUCCESSFULLY,
    Book.mapOne(result.rows[0])
  );
};
const addBook = async (book) => {
  const result = await pool.query(
    "insert into books (title,author,published_date,isbn) values ($1,$2,$3,$4) returning *",
    [book.title, book.author, book.published_date, book.isbn]
  );
  return new SuccessResult(
    DATA_ADDED_SUCCESSFULLY,
    Book.mapOne(result.rows[0])
  );
};
const updateBook = async (book) => {
  const result = await pool.query(
    "update books set title = $2,author = $3 , published_date = $4 , isbn = $5 where id = $1 returning *",
    [book.id, book.title, book.author, book.published_date, book.isbn]
  );
  return new SuccessResult(
    DATA_UPDATED_SUCCESSFULLY,
    Book.mapOne(result.rows[0])
  );
};
const deleteBook = async (id) => {
  const result = await pool.query(
    "delete from books b where b.id = $1 returning *",
    [id]
  );
  return new SuccessResult(
    DATA_DELETED_SUCCESSFULLY,
    Book.mapOne(result.rows[0])
  );
};

module.exports = { getAllBooks, getOneBook, addBook, updateBook, deleteBook };
