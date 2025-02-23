const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const path = require('path')
const cors = require('cors')
const multer = require("multer");


//Config

dotenv.config({ path: "config/config.env" })

const errorMiddleware = require("./middleware/error")

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(__dirname));


console.log("path: ", path.join(__dirname,  'uploads'))

app.get('/', (req, res) => {
  res.send('hello world')
})

//Route Imports

const user = require("./routes/userRoute");



app.use(
  cors({
    // origin: "*",
    // origin: 'http://localhost:3000',
    origin: [

      "http://localhost:3000",
      // "http://localhost:8080",
      // "https://mern-project-frontend-sigma.vercel.app/"

    ],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);


app.use("/api/v1", user);

//Middleware for Errors
app.use(errorMiddleware)


module.exports = app;
// module.exports = upload;
