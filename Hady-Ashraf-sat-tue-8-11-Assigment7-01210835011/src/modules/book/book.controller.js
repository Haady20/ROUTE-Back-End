import { Router } from "express";
import {
  createBookCollection,
  createIndex,
  createBook,
  createMultibalBook,
  updateBookYear,
  FindBookByTitle,
  FindBooksByYearRange,
  FindBooksByGenre,
  FindLimitBooks,
  getIntBookYear,
  RemoveBooksByYear,
  FindBooksExcludeGenres,
  booksAggregateOne,
  booksAggregateTwo,
  booksAggregateThree,
  booksAggregateFour,
} from "./book.service.js";
import { bookModel } from "../../DB/models/book.model.js";

const router = Router();

router.post("/collection/books", createBookCollection);
router.post("/collection/books/index", createIndex);
router.post("/books", createBook);
router.post("/books/batch", createMultibalBook);
router.patch("/books/Future", updateBookYear);
router.get("/books/title", FindBookByTitle);
router.get("/books/year", FindBooksByYearRange);
router.get("/books/genre", FindBooksByGenre);
router.get("/books/skip-limit", FindLimitBooks);
router.get("/books/year-integer", getIntBookYear);
router.get("/books/exclude-genres", FindBooksExcludeGenres);
router.delete("/books/before-year", RemoveBooksByYear);
router.get("/books/aggregate1", booksAggregateOne);
router.get("/books/aggregate2", booksAggregateTwo);
router.get("/books/aggregate3", booksAggregateThree);
router.get("/books/aggregate4", booksAggregateFour);

export default router;
