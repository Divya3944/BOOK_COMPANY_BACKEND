//MAIN BACKEND FILE(day 29 to 35)

const db = require("./database/index.js");
//console.log(db);//prints all the datas
//console.log(db.publications);//only publication data is printed
console.log(db.books);
console.log(db.authors);
console.log(db.publications);

const express = require("express");
const { request, json } = require("express");
const app = express();
app.use(express.json()); //As the app can't read files in json format in post request this line is added.

//localhost:3000/
http: app.get("/", (req, res) => {
  const getAllBooks = db.books;
  return res.json(getAllBooks); // or use res.send(getAllBooks); both does the same thing
  //return is to end the process
});

//http://localhost:3000/book/12345Two
//to view output use above link
app.get("/book/:isbn", (req, res) => {
  //console.log(req.params);
  const { isbn } = req.params; // here isbn is taken as the request parameter
  //console.log(isbn);
  const getSpecificBook = db.books.filter((book) => book.ISBN === isbn); //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificBook.length === 0) {
    //if no such isbn is present
    return res.json({ error: `No Book found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecificBook[0]); //as isbn is unique only one result might be present therefore index[0]
});

app.get("/book-category/:category", (req, res) => {
  //console.log(req.params);
  const { category } = req.params; // here isbn is taken as the request parameter
  //console.log(isbn);
  const getSpecificBook = db.books.filter((book) =>
    book.category.includes(category)
  );
  //we used include as category is a array.
  //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificBook.length === 0) {
    //if no such isbn is present
    return res.json({ error: `No Book found for the ISBN of ${category}` });
  }
  return res.json(getSpecificBook); //as isbn is unique only one result might be present therefore index[0]
});
//*******************************************************************************************************************************************************************************************************************************/
//Authors getapi
app.get("/authors", (req, res) => {
  const getAllAuthors = db.authors;
  return res.json(getAllAuthors);
});

//https://localhost:3000/authors/1
app.get("/authors-id/:id", (req, res) => {
  //console.log(req.params);
  let { id } = req.params; // here isbn is taken as the request parameter
  id = Number(id);
  //we change id to number bcz in the above line its taken as string while in the database its in the number format
  //console.log(isbn);
  const getSpecificAuthor = db.authors.filter((author) => author.id === id); //ISBN is the no we give in local host that is compared with isbn
  //   console.log(getSpecificBook);
  //   console.log(getSpecificBook.length);//just for understanding
  if (getSpecificAuthor.length === 0) {
    //if no such isbn is present
    return res.json({ error: `No Author found for the id of ${id}` });
  }
  return res.json(getSpecificAuthor[0]); //as isbn is unique only one result might be present therefore index[0]
});

//https://localhost:3000/authors-isbn/12345Two
app.get("/authors-isbn/:isbn", (req, res) => {
  console.log(req.params);
  const { isbn } = req.params; // here isbn is taken as the request parameter
  const getSpecificAuthor = db.authors.filter((author) =>
    author.books.includes(isbn)
  );
  //we change id to number bcz in the above line its taken as string while in the database its in the number format

  console.log(getSpecificBook.length); //just for understanding
  if (getSpecificAuthor.length === 0) {
    //if no such isbn is present
    return res.json({ error: `No Author found for the id of ${isbn}` });
  }
  return res.json(getSpecificAuthor); //as isbn is unique only one result might be present therefore index[0]
});

//Above is the homework

//************************************************************************************************************************************************************************************************************/
//Publications api

//http://localhost:3000/publications
app.get("/publications", (req, res) => {
  const getAllPublications = db.publications;
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

app.post("/book", (req, res) => {
  db.books.push(req.body);
  return res.json(db.books);
});

//http://localhost:3000/author
app.post("/author", (req, res) => {
  db.authors.push(req.body);
  return res.json(db.authors);
});
//http://localhost:3000/publication
app.post("/publication", (req, res) => {
  db.publications.push(req.body);
  return res.json(db.publications);
});

//**********************************************************************************************************************************************************************************************************/
//Put API'S
//http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
  console.log(req.body);
  //console.log(req.params);
  const { isbn } = req.params;
  db.books.forEach((book) => {
    if (book.ISBN === isbn) {
      return { ...book, ...req.body };
      // "..." is a spread operator
      //for the particular isbn the book details is overwritten by req.body
    }
    return book;
    //after the changes the book will be return
  });
  return res.json(db.books);
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
  //console.log(req.body);
  //console.log(req.params);
  const { id } = req.params;
  db.authors.forEach((author) => {
    //we did not use map because it creates a new data and we need too replace it explicitly.
    //foreach automatically replaces it instead of creating a new instance of data
    if (author.id == id) {
      console.log({ ...author, ...req.body });
      return { ...author, ...req.body };

      // "..." is a spread operator
      //for the particular isbn the book details is overwritten by req.body
    }
    return author;

    //after the changes the book will be return
  });

  return res.json(db.authors);
});

//*******************************************************************************************************************************************************************************************************************************************************************/
//http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req, res) => {
  console.log(req.body);
  //console.log(req.params);
  const { isbn } = req.params;
  const filteredBooks = db.books.filter((book) => book.ISBN !== isbn);
  db.books = filteredBooks;
  return res.json(db.books);
});

//http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
  console.log(req.body);
  //console.log(req.params);
  let { isbn, id } = req.params;
  id = Number(id);
  db.books.forEach((book) => {
    if (book.ISBN === isbn) {
      if (!book.authors.includes(id)) {
        return; //if 1 is not present then simply written
      }
      book.authors = book.authors.filter((author) => author !== id);
      return book;
    }
  });

  return res.json(db.books);
});

//http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
  console.log(req.body);
  let { id, isbn } = req.params;
  isbn = Number(isbn);
  db.authors.forEach((author) => {
    if (db.authors.id === id) {
      if (!db.authors.books.includes(isbn)) {
        return; //if 1 is not present then simply written
      }
      db.authors.books = db.authors.books.filter((book) => book !== isbn);
      return author;
    }
  });

  return res.json(db.authors);
});

//http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", (req, res) => {
  console.log(req.body);
  //console.log(req.params);
  const { id } = req.params;
  const filteredBooks = db.authors.filter((author) => author.ISBN !== isbn);
  db.authors = filteredBooks;
  return res.json(db.authors);
});

//http://localhost:3000/publication-delete/1
app.delete("publication-delete/:id", (req, res) => {
  console.log(req.body);
  //console.log(req.params);
  const { id } = req.params;
  const filteredBooks = db.publications.filter(
    (publication) => publication.id !== id
  );
  db.publications = filteredBooks;
  return res.json(db.publications);
});

app.listen(3000, () => {
  console.log("My Express app is running");
});
