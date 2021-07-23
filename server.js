const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session);
// DB connect
const url = process.env.DB_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to db');
}).catch(err => {
    console.log(err);
});
// Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
})

// sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: mongoStore,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

app.use(flash())
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
