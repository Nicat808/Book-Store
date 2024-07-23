class BookAddDTO {
  constructor(requestData) {
    this.title = requestData.title;
    this.author = requestData.author;
    this.published_date = requestData.published_date;
    this.isbn = requestData.isbn;
  }
}

module.exports = BookAddDTO;
