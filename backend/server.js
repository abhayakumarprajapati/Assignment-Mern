const app = require("./app")

const dotenv = require("dotenv");
const cloudinary = require("cloudinary")

const connectDatabase = require("./config/database")

// Handling Uncaught Exception  
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1);
})


//Config 

dotenv.config({ path: "config/config.env" })
// if (process.env.NODE_ENV !== "PRODUCTION") {

//     // dotenv.config({ path: "backend/config/config.env" })
//     require('dotenv').config({ path: "backend/config/config.env" })
// }
//connecting to database
connectDatabase();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

const port = process.env.PORT || 5500


const server = app.listen(port, () => {

    // console.log(`Server is working on http://localhost:${PORT}`);
    // console.log(`Server is working on http://localhost:${process.env.PORT}`);

})



//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {

    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})