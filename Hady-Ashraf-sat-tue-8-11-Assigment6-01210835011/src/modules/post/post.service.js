import { Model } from "sequelize";
import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";
import commentModel from "../../DB/models/comment.model.js";
import { sequelize } from "../../DB/connectionDB.js";

const getPosts = async (req, res) => {
  const posts = postModel.findAll();
  return res.status(200).json({
    message: "Success",
    posts,
  });
};

const createPost = async (req, res) => {
  try {
    const post = postModel.build(req.body);

    await post.save();

    return res.status(201).json({
      message: "Success",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await postModel.destroy({
      where: {
        id,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getPostsDetails = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title"],

      include: [
        {
          model: userModel,
          attributes: ["name"],
        },
      ],
    });

    return res.status(200).json({
      message: "Success",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getPostsComments = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: [
        "id",
        "title",
        [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentsCount"],
      ],
      include: [
        {
          model: userModel,
          attributes: ["name"],
        },
        {
          model: commentModel,
          attributes: [],
          duplicating: false,
        },
      ],
      group: ["Post.id", "User.id"],
    });

    return res.status(200).json({
      message: "Success",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  getPosts,
  createPost,
  deletePost,
  getPostsDetails,
  getPostsComments,
};
