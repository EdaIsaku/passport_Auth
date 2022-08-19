const pool = require("./connection.js");

const createTable = () => {
  const query =
    "CREATE TABLE IF NOT EXISTS users(ID  SERIAL PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), email VARCHAR(30)) ";
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
};

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getUserByID = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM users WHERE id=${id}`;
  pool.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const addUser = (req, res) => {
  const { id, first_name, last_name, email } = req.query;
  console.log(id, first_name, last_name, email);

  const query =
    "INSERT INTO users (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *";
  pool.query(query, [id, first_name, last_name, email], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result.rows);
      res.status(200).json(result.rows);
    }
  });
};

module.exports = {
  createTable,
  getUsers,
  getUserByID,
  addUser,
};
