const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
const bodyParser = require("body-parser");
// configure the app to use bodyParser()
//app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const dbConfig = require("./Config/dbConfig");
const port = process.env.PORT || 5000;

const server = require("http").createServer(app);
const usersRoute = require("./routes/usersRoutes");
const questionsRoute = require("./routes/questionsRoutes"); //

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/users", usersRoute);
app.use("/api/questions", questionsRoute); //

server.listen(port, () => console.log(`Server running on port ${port}`));
