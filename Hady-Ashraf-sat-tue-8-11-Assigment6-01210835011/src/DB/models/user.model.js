import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.trim().length <= 6) {
            throw new Error(
              "Password length must be greater than 6 characters.",
            );
          }
        },
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    hooks: {
      beforeCreate(user) {
        checkNameLength(user);
      },
    },
  },
);

function checkNameLength(user) {
  if (user.name.trim().length <= 2) {
    throw new Error("Name length must be greater than 2 characters.");
  }
}

export default User;
