const pool = require("./connection.js");
const logger = require("../Logs/logger");

const createTable = () => {
  const query =
    "CREATE TABLE IF NOT EXISTS users(ID  SERIAL PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), email VARCHAR(30)) ";
  pool.query(query, (error, result) => {
    if (error) {
      logger.error(error);
    } else {
      console.log(result);
    }
  });
};

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  pool.query(query, (error, result) => {
    if (error) {
      logger.error(error);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getUserByID = (req, res) => {
  const { id } = req.params;
  const query = { text: "SELECT * FROM users WHERE id = $1", values: [id] };

  pool.query(query, (error, result) => {
    if (error) {
      logger.error(error);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const addUser = (req, res) => {
  const { id, first_name, last_name, email } = req.body;
  const query =
    "INSERT INTO users (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *";
  pool.query(query, [id, first_name, last_name, email], (error, result) => {
    if (error) {
      logger.error(error);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const deleteByID = (req, res) => {
  const { id } = req.params;
  const query = { text: "DELETE FROM users WHERE id = $1", values: [id] };

  pool.query(query, (error, result) => {
    if (error) {
      logger.error(error);
    } else {
      res.status(200).send(`Deleted user with id: ${id}`);
    }
  });
};

module.exports = {
  createTable,
  getUsers,
  getUserByID,
  addUser,
  deleteByID,
};
