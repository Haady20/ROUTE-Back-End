import { db } from "../../DB/connectionDB.js";
import authorModel from "../../DB/models/author.model.js";

export const createAutor = async (req, res) => {
  try {
    const authorData = req.body;
    const result = await db.collection("authors").insertOne(authorData);
    return res.status(201).json({
      message: "Authors created successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't create autor.",
      error: error.message,
    });
  }
};
