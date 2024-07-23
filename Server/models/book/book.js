class Book{
    constructor(row){
        this.id = row.id;
        this.title= row.title;
        this.author = row.author;
        this.published_date = row.published_date;
        this.isbn = row.isbn
    }

    static mapAll(dbRows){
        const rows = [];
        for(const row of dbRows){
            const book = new Book(row);
            rows.push(book);
        }
        return rows;
    }

    static mapOne(row){
        const book = new Book(row);
        return book;
    }
}

module.exports = Book;