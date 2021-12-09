const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

var forms = multer();

// create express app
const app = express();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

app.use(forms.array())


// define a root route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Torchyn application."});
});

// Require device routes
const itemRoutes =  require("./src/routes/item.routes")(app);

// setup server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

