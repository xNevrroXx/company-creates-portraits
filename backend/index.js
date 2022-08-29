// third-party modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
// own modules
const routes = require("./routes/routes");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

routes(app);

app.listen(port, () => {
  console.log(`server url: http://localhost:${port}`);
})