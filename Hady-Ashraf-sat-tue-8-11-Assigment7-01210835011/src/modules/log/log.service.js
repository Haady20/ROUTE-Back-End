import { db } from "../../DB/connectionDB.js";
import { logModel } from "../../DB/models/log.model.js";

export const createLogCollection = async (req, res) => {
  try {
    const result = await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
    return res.status(201).json({ message: "ok" });
  } catch (error) {
    return res.status(500).json({
      message: "Can't create logs collection.",
      error: error.message,
    });
  }
};

export const createLog = async (req, res) => {
  try {
    const logData = req.body;
    const result = await logModel.insertOne(logData);
    return res.status(201).json({
      message: "Log created sucessfully.",
      index: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't create log.",
      error: error.message,
    });
  }
};

