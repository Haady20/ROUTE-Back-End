import userModel from "../../DB/models/user.model.js";
import postModel from "../../DB/models/post.model.js";
import commentModel from "../../DB/models/comment.model.js";
import { Op } from "sequelize";

const createBulkComments = async (req, res) => {
  try {
    const comments = await commentModel.bulkCreate(req.body);

    return res.status(201).json({
      message: "Comments created successfully",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await commentModel.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId != userId) {
      return res.status(403).json({
        message: "You are not allowed to update this comment",
      });
    }

    comment.content = content;

    await comment.save();

    return res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const findOrCreateComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    const [comment, created] = await commentModel.findOrCreate({
      where: {
        userId,
        postId,
        content,
      },
      defaults: {
        userId,
        postId,
        content,
      },
    });

    if (created) {
      return res.status(201).json({
        message: "Comment created successfully",
        comment,
      });
    }

    return res.status(200).json({
      message: "Comment already exists",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const searchComments = async (req, res) => {
  try {
    const { word } = req.query;

    const comments = await commentModel.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    return res.status(200).json({
      message: "Success",
      totalComments: comments.count,
      comments: comments.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await commentModel.findAll({
      where: {
        postId,
      },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return res.status(200).json({
      message: "Success",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCommentByPk = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentModel.findByPk(id, {
      include: [
        {
          model: userModel,
          attributes: ["id", "name", "email"],
        },
        {
          model: postModel,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Success",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentByPk,
};
