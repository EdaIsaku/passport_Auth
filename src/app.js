require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const db = require("../db/queries");

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

const PORT = process.env.PORT || 3000;

app.get("/users", db.getUsers);
app.get("/users:id", db.getUserByID);
app.post("/users", db.addUser);

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
