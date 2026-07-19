import userModel from "../../DB/models/user.model.js";

const postUser = async (req, res) => {
  try {
    const user = userModel.build(req.body);
    await user.save();

    return res.status(201).json({
      message: "Success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await userModel.update(req.body, {
      where: {
        id,
      },
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = await userModel.findByPk(id);
    return res.status(200).json({
      message: "Success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  getUserByEmail,
  postUser,
  updateUser,
  getUserById,
};
