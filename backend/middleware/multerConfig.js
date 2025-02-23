const multer = require("multer");
const path = require("path");


const app = require("../app");

console.log("path in multerconfig: ", path.join(__dirname,  'uploads'))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let finalDestinationPath = path.join(__dirname,".." , "uploads");
        // const destinationPath1 = path.join(__dirname, "..", "public", "documents");
        // cb(null, '/tmp/my-uploads')
        cb(null, finalDestinationPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split(".").pop())
    }
})

const upload = multer({ storage: storage })

module.exports = upload;
