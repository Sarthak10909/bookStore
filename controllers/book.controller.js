const {booksTable} = require('../models/book.model');
const db = require("../db");
const {sql} = require('drizzle-orm')
const {eq} = require("drizzle-orm");

exports.getAllBooks = async function(req, res){
    const { search } = req.query;
    const books = await db.select().from(booksTable);

    if(search){
        const books = await db
            .select()
            .from(booksTable)
            .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
        );
    }

    res.json(books);

}

exports.getBookById = async function(req, res){
    const id = req.params.id;

    const [book] = await db.select().from(booksTable).where((table) => eq(table.id, id)).limit(1);

    if(!book){
        return res
            .status(400)
            .json({error : `Book with id ${id} does not exist!`});
    }

    return res.json(book);
}

exports.createBook = async function(req, res){
    const {title, authorId, description} = req.body;

    if(!title || title === '') return res.status(400).json({error : "title is required"});

    const [result] = await db.insert(booksTable).values({
        title, authorId, description,
    }).returning({
        id: booksTable.id,
    });

    return res.status(201).json({"message" : "Book has been created", id: result.id});
}

exports.deleteBook = async function(req, res){
    const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id, id));

    return res.status(200).json({messsage :"Deleted the book"});
}