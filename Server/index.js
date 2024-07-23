const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mainRouter = require('./routes/index');

const PORT = 8000;
const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',mainRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
