const postgress = require("postgres");

const sql = postgress({
  port: 5432,
  host: "127.0.0.1",
  user: "postgres",
  password: "eda",
  database: "api",
});

module.exports = { sql };
