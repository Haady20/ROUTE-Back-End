import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assigmentsdb", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export const ConnectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const SyncDB = async () => {
  try {
    await sequelize.sync({});
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to sync the database:", error);
  }
};
