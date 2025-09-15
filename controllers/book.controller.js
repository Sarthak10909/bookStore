const {BOOKS} = require('../db/book');

exports.getAllBooks = function(req, res){
    res.json(BOOKS);
}

exports.getBookById = function(req, res){
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({error : `id must be of type number`});
    }

    const book = BOOKS.find((e) => e.id == id);

    if(!book){
        return res
            .status(400)
            .json({error : `Book with id ${id} does not exist!`});
    }

    return res.json(book);
}

exports.createBook = function(req, res){
    const {title, author} = req.body;

    if(!title || title === '') return res.status(400).json({error : "title is required"});
    if(!author || author === '') return res.status(400).json({error : "author is required"});

    const id = BOOKS.length + 1;

    const book = {id, title, author};
    BOOKS.push(book);

    return res.status(201).json({"message" : "Book has been created", id});
}

exports.deleteBook = function(req, res){
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({error : `id must be of type number`});
    }

    const indexToDelete = BOOKS.findIndex((e) => e.id === id);

    if(indexToDelete < 0){
        return res
            .status(400)
            .json({error : `Book with id ${id} does not exist!`});
    }

    BOOKS.splice(indexToDelete, 1);

    return res.status(200).json({messsage :"Deleted the book"});
}