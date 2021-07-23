const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");

// DB connect
const url = "mongodb://localhost/pizza_shop";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoose connected');
}).catch(err => {
    console.log(err);
})
// Assets
app.use(express.static("public"));

// Setting template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log("Server started");
});
