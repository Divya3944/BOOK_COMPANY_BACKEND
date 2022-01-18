//MAIN BACKEND FILE(day 29 to 35)
//Import the mongoose module
const db = require("./database/index.js");
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");
const express = require("express");
const { request, json } = require("express");
const app = express();
app.use(express.json());

var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://aishuv353:aishu637408@cluster0.ix5kg.mongodb.net/book-company?retryWrites=true&w=majority&ssl=true";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTION ESTABLISHED"))
  .catch((err) => console.log(err));
//book.js
// const db = require("./database/index.js");
// const mongoose = require("mongoose"); //to import mongodb
// const express = require("express");
// const { request, json } = require("express");
// const app = express();
// app.use(express.json()); //As the app can't read files in json format in post request this line is added.

// const { MongoClient } = require("mongodb");
// // const uri =
// //   "mongodb+srv://aishuv353:VfgDTyz5DF9IhMs5@cluster0.ix5kg.mongodb.net/book-company?retryWrites=true&w=majority";
// const uri =
//   "mongodb+srv://aishuv353:OyqjmKuVxFCeRZlq@cluster0.ix5kg.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const bcollection = client
//     .db("book-company")
//     .collection("books")
//     .findOne({ ISBN: "12345One" });
//   // perform actions on the collection object
//   bcollection
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//   // console.log(bcollection);
//   client.close();
// });

// async function main() {
//   const uri =
//     "mongodb+srv://aishuv353:VfgDTyz5DF9IhMs5@cluster0.ix5kg.mongodb.net/book-company?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   try {
//     await client.connect();
//     const result = await client
//       .db("book-company")
//       .collection("books")
//       .findOne({ ISBN: "12345One" });
//     console.log(result);
//     //await listDatabases(client);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// }

//console.log(db);//prints all the datas
//console.log(db.publications);//only publication data is printed
console.log(db.books);
console.log(db.authors);
console.log(db.publications);

//localhost:3000/books
http: app.get("/books", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks); // or use res.send(getAllBooks); both does the same thing
  //return is to end the process
}); //now fetch bookmodel from mongodb
//green denotes promise it needs to be resolved using await and async
//.find and .findone are from mongodb specific not js

//http://localhost:3000/book/12345Two
//to view output use above link
app.get("/book/:isbn", async (req, res) => {
  //console.log(req.params);
  const { isbn } = req.params; // here isbn is taken as the request parameter
  //console.log(isbn);
  const getSpecificBook = await BookModel.findOne({ ISBN: isbn });
  //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificBook === null) {
    //if no such isbn is present
    return res.json({ error: `No Book found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecificBook); //as isbn is unique only one result might be present therefore index[0]
});
//findone always points to an object so remove length
app.get("/book-category/:category", async (req, res) => {
  //console.log(req.params);
  const { category } = req.params; // here isbn is taken as the request parameter
  //console.log(isbn);
  const getSpecificBooks = await BookModel.find({ category: category });

  //we used include as category is a array.
  //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificBooks.length === 0) {
    //if no such isbn is present
    return res.json({ error: `No Book found for the category of ${category}` });
  }
  return res.json(getSpecificBooks); //as isbn is unique only one result might be present therefore index[0]
});
//*******************************************************************************************************************************************************************************************************************************/
//Authors getapi
app.get("/authors", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

//https://localhost:3000/authors-id/1
app.get("/authors-id/:id", async (req, res) => {
  //console.log(req.params);
  const { id } = req.params; // here isbn is taken as the request parameter
  //id = Number(id);
  //we change id to number bcz in the above line its taken as string while in the database its in the number format
  //console.log(isbn);
  const getSpecificAuthor = await AuthorModel.findOne({ id: id }); //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificAuthor === null) {
    //if no such isbn is present
    return res.json({ error: `No Author found for the id of ${id}` });
  }
  return res.json(getSpecificAuthor); //as isbn is unique only one result might be present therefore index[0]
});

//https://localhost:3000/authors-isbn/12345Two/3
app.get("/authors-isbn/:isbn/:id", async (req, res) => {
  const { isbn } = req.params; // here isbn is taken as the request parameter
  //id = Number(id);
  //we change id to number bcz in the above line its taken as string while in the database its in the number format
  //console.log(isbn);
  const getSpecificAuthor = await AuthorModel.find({ books: isbn }); //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificAuthor.length === 0) {
    //if no such isbn is present
    return res.json({ error: `No Author found for the isbn of ${isbn}` });
  }
  return res.json(getSpecificAuthor);
});

//Above is the homework

//************************************************************************************************************************************************************************************************************/
//Publications api

//http://localhost:3000/publications
app.get("/publications", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

//https://localhost:3000/publications/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {});

//***************************************************************************************************************************************************************************************************************************************/
//
//
//
//
//
//
//
//
//
//
//
//Post Api
//install postman desktop version{
//
//double quotes must
//send
//view output in terminal
//}
//http://localhost:3000/book
// app.post("/book", (req, res) => {
//   //console.log(req.body);
//   const { newBook } = req.body;
//   console.log(newBook);
//   db.books.push(newBook);
//   return res.json(db.books);
// });
//Alternative

app.post("/book", async (req, res) => {
  const addNewBook = await BookModel.create(req.body);
  return res.json({
    books: addNewBook,
    message: "Book was added!!!",
  });
});
//for create refer to mongoose documentation

//http://localhost:3000/author
app.post("/author", async (req, res) => {
  const addNewAuthor = await AuthorModel.create(req.body);
  return res.json({
    books: addNewAuthor,
    message: "Author was added!!!",
  });
});
//http://localhost:3000/publication
app.post("/publication", async (req, res) => {
  const addNewPublication = await PublicationModel.create(req.body);
  return res.json({
    books: addNewPublication,
    message: "Publication was added!!!",
  });
});

//**********************************************************************************************************************************************************************************************************/
//Put API'S
//http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", async (req, res) => {
  // console.log(req.body);
  //console.log(req.params);
  const { isbn } = req.params;
  //const { isbn } = req.params;
  const updateBook = await BookModel.findOneAndUpdate(
    { ISBN: isbn }, //checks the respective isbn
    req.body, //does changes
    { new: true } //displays changes
  );
  return res.json({ bookUpdated: updateBook, message: "Book was updated !!!" });
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req, res) => {
  const { id } = req.params;
  //const { isbn } = req.params;
  const updateAuthor = await AuthorModel.findOneAndUpdate(
    { id: id }, //checks the respective isbn
    req.body, //does changes
    { new: true } //displays changes
  );
  return res.json({
    authorUpdated: updateAuthor,
    message: "Author was updated !!!",
  });
});
//http://localhost:3000/publication-update/3
app.put("/publication-update/:id", async (req, res) => {
  const { id } = req.params;
  //const { isbn } = req.params;
  const updatePublication = await PublicationModel.findOneAndUpdate(
    { id: id }, //checks the respective isbn
    req.body, //does changes
    { new: true } //displays changes
  );
  return res.json({
    publicationUpdated: updatePublication,
    message: "publication was updated !!!",
  });
});

//*******************************************************************************************************************************************************************************************************************************************************************/
//http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async (req, res) => {
  const { isbn } = req.params;
  //const { isbn } = req.params;
  const deleteBook = await BookModel.deleteOne({ ISBN: isbn }); //checks the respective isbn
  return res.json({ bookdeleted: deleteBook, message: "Book was deleted!!!" });
});

//http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
  const { isbn, id } = req.params;
  //const { isbn } = req.params;
  let getSpecificBook = await BookModel.findOne({ ISBN: isbn });
  if (getSpecificBook === null) {
    return res.json({ error: `No Book found for the ISBN of ${isbn}` });
  } else {
    getSpecificBook.authors.remove(id);
    const updateBook = await BookModel.findOneAndUpdate(
      { ISBN: isbn },
      getSpecificBook,
      { new: true }
    );
    return res.json({
      bookUpdated: updateBook,
      message: "Author was deletedd from the book!!!",
    });
  }
});

//http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/author-book-delete/:id/:isbn", async (req, res) => {
  const { id, isbn } = req.params;
  //const { isbn } = req.params;
  let getSpecificBook = await BookModel.findOne({ id: id });
  if (getSpecificBook === null) {
    return res.json({ error: `No Book found for the ISBN of ${id}` });
  } else {
    getSpecificBook.authors.remove(ISBN);
    const updateBook = await BookModel.findOneAndUpdate(
      { id: id },
      getSpecificBook,
      { new: true }
    );
    return res.json({
      bookUpdated: updateBook,
      message: "Author was deletedd from the book!!!",
    });
  }
});

//http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", async (req, res) => {
  const { id } = req.params;
  //const { isbn } = req.params;
  const deleteBook = await AuthorModel.deleteOne({ id: id }); //checks the respective isbn
  return res.json({ bookdeleted: deleteBook, message: "Book was deleted!!!" });
});

//http://localhost:3000/publication-delete/1
app.delete("publication-delete/:id", async (req, res) => {
  const { id } = req.params;
  //const { isbn } = req.params;
  const deleteBook = await PublicationModel.deleteOne({ id: id }); //checks the respective isbn
  return res.json({ bookdeleted: deleteBook, message: "Book was deleted!!!" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("My Express app is running");
});
