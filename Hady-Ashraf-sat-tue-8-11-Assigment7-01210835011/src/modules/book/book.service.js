import { db } from "../../DB/connectionDB.js";
import { bookModel } from "../../DB/models/book.model.js";
import { ObjectId } from "mongodb";

export const createBookCollection = async (req, res) => {
  try {
    const result = await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              pattern: "^(?!\\s*$).+",
              description: "title must be a non-empty string and is required.",
            },
          },
        },
      },
      validationAction: "error",
      validationLevel: "strict",
    });
    return res.status(201).json({ message: "ok" });
  } catch (error) {
    return res.status(500).json({
      message: "Can't creat books collection.",
      error: error.message,
    });
  }
};

export const createIndex = async (req, res) => {
  try {
    const result = await bookModel.createIndex({ title: 1 });
    return res.status(201).json({
      message: "Index created successfully",
      index: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't create index.",
      error: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    const result = await bookModel.insertOne(bookData);
    return res.status(201).json({
      message: "Book created successfully",
      index: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't insert book.",
      error: error.message,
    });
  }
};

export const createMultibalBook = async (req, res) => {
  try {
    const booksData = req.body;
    const result = await bookModel.insertMany(booksData);
    return res.status(201).json({
      message: "Books created successfully",
      index: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't insert books.",
      error: error.message,
    });
  }
};

export const updateBookYear = async (req, res) => {
  try {
    const { _id, year } = req.body;
    const result = await bookModel.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          year,
        },
      },
    );
    return res.status(201).json({
      message: "Book updated successfully",
      index: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't update book.",
      error: error.message,
    });
  }
};

export const FindBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const book = await bookModel.findOne({ title: title });
    if (book) {
      return res.status(200).json({
        message: "Book Fuound successfully",
        index: book,
      });
    } else {
      return res.status(404).json({
        message: "Book doesn't Fuound ",
        index: book,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error ocuure.",
      error: error.message,
    });
  }
};

export const FindBooksByYearRange = async (req, res) => {
  try {
    const { from, to } = req.query;
    const query = {};
    if (from || to) {
      query.year = {};
      if (from) query.year.$gte = Number(from);
      if (to) query.year.$lte = Number(to);
    }
    const books = await bookModel.find(query).toArray();
    if (books.length > 0) {
      return res.status(200).json({
        message: "Books found successfully.",
        count: books.length,
        data: books,
      });
    } else {
      return res.status(404).json({
        message: "No books found within year range.",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

export const FindBooksByGenre = async (req, res) => {
  try {
    const { genres } = req.query;
    const books = await bookModel.find({ genres: genres }).toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const FindLimitBooks = async (req, res) => {
  try {
    const books = await bookModel.find().skip(2).toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const getIntBookYear = async (req, res) => {
  try {
    const books = await bookModel
      .find({
        year: {
          $type: "int",
        },
      })
      .toArray();
    return res.status(200).json({
      message: "Success.",
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const FindBooksExcludeGenres = async (req, res) => {
  try {
    const { genre } = req.query;
    const books = await bookModel
      .find({
        genres: {
          $ne: genre,
        },
      })
      .toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

export const RemoveBooksByYear = async (req, res) => {
  try {
    const { year } = req.query;
    const books = await bookModel.deleteMany({ year: Number(year) });
    return res.status(200).json({
      message: "Books deleted successfully.",
      deleted_count: books.deletedCount,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

export const booksAggregateOne = async (req, res) => {
  try {
    const year = Number(req.query.year);
    const books = await bookModel
      .aggregate([
        {
          $match: {
            year: { $gt: year },
          },
        },
        {
          $sort: {
            year: -1,
          },
        },
      ])
      .toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

export const booksAggregateTwo = async (req, res) => {
  try {
    const year = Number(req.query.year);
    const books = await bookModel
      .aggregate([
        {
          $match: {
            year: { $gt: year },
          },
        },
        {
          $sort: {
            year: -1,
          },
        },
        {
          $project: {
            _id: 0,
            title: 1,
            author: 1,
            year: 1,
          },
        },
      ])
      .toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

export const booksAggregateThree = async (req, res) => {
  try {
    const books = await bookModel
      .aggregate([
        {
          $unwind: "$genres",
        },
      ])
      .toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

export const booksAggregateFour = async (req, res) => {
  try {
    const books = await bookModel
      .aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "_id",
            foreignField: "bookId",
            as: "logs",
          },
        },
      ])
      .toArray();
    return res.status(200).json({
      message: "Books found successfully.",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};
