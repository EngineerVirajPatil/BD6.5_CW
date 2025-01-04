const express = require("express");

const app = express();

app.use(express.json());

let users = [];
let books = [];
let reviews = [];

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "Name is not mentioned or Name is not mentioned in proper format";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is not mentioned or Email is not mentioned in proper format";
  }
  return null;
}

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "title is not mentioned or title is not mentioned in proper format";
  }
  if (!book.author || typeof book.author !== "string") {
    return "author is not mentioned or author is not mentioned in proper format";
  }
  return null;
}

function validateReview(review) {
  if (!review.content || typeof review.content !== "string") {
    return "content is not mentioned or content is not mentioned in proper format";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "userId is not mentioned or userId is not mentioned in proper format";
  }
  return null;
}

app.post("/api/users", (req, res) => {
  let error = validateUser(req.body);
  if (error) {
    return res.status(400).send(error);
  } else {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    return res.status(201).json(user);
  }
});

app.post("/api/books", (req, res) => {
  let error = validateBook(req.body);
  if (error) {
    return res.status(400).send(error);
  } else {
    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    return res.status(201).json(book);
  }
});

app.post("/api/reviews", (req, res) => {
  let error = validateReview(req.body);
  if (error) {
    return res.status(400).send(error);
  } else {
    const review = { id: reviews.length + 1, ...req.body };
    reviews.push(review);
    return res.status(201).json(review);
  }
});

module.exports = { app, validateUser, validateBook, validateReview };
