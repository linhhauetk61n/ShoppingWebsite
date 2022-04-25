const express = require("express");
const route = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const app = express();

//Database
const db = require("./config/db/index");
db.connect();
app.use(cors());
app.use(express.json());
route(app);

const PORT = process.env.PORT || 8000;
//Listen
app.listen(PORT, () => console.log(`Server is running on port: ${PORT} `));
