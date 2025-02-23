const mongoose = require("mongoose");

mongoose.set('strictQuery', true);





const connectDatabase = async () => {

    const DB_URI = "mongodb://localhost:27017/Ecommerce"

    // await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log('err: ',err.message)
            console.log('err: ',err.cause)
            console.log('err: ', process.env.DB_URI)
            console.log("Mongodb is not connected");
        }

        else {
            console.log(`Mongodb is connected with ->-> ${DB_URI}`);

        }
    })
}


module.exports = connectDatabase;


