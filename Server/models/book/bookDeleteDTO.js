class BookDeleteDTO{
    constructor(requestData){
        this.id = requestData.id;
        this.title= requestData.title;
        this.author = requestData.author;
        this.published_date = requestData.published_date;
        this.isbn = requestData.isbn
    }
}

module.exports = BookDeleteDTO;