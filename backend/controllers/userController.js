const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel")
const sendToken = require("../utils/jwtToken")

const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//1st method of register user
// const registerUser = (req, res) => {
//     const username = req.body.name;
//     const userEmail = req.body.email;
//     const userpassword = req.body.password;


//     res.json({
//         success: true,

//     })
// }
// module.exports = registerUser;

//2nd method Register-User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

   
    const { name, email, password } = req.body;

    console.log(req)

    const user = new User({
        name,
        email,
        password,
        avatar:`/uploads/${req.file.filename}`
    })

    await user.save()

    console.log("entered in register user_2")

    // we make this as separate function by creating a file jwtToken.js in utils


    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success: true,
    //     // user,
    //     token,
    // })
    //short syntax

    sendToken(user, 201, res);

})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given password and email both
    const url = req.protocol + "://" + req.get("host");

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }
    // so if user exists , we find user in database
    let user = await User.findOne({ email }).select("+password");

    user.avatar =  `${url}${user.avatar}`

    if (!user) {
        return next(new ErrorHandler("Invalid email or Password", 401));// 401 is status code : Unauthorised
    }
    // here we are sending password to userModel.js
    const isPasswordMatched = await user.comparePassword(password);//here we comparing password of the user we get
    //if ispasswordMatched is true it means password matched and once password get matched means we let user log in

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or Password", 401));
    }
    // we make this as separate function by creating a file jwtToken.js in utils
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // })
    //short syntax
    sendToken(user, 200, res);

})


//Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", "null", {
        expire: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});


// Get User Detail

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    console.log('test_getuserdetails');
    const url = req.protocol + "://" + req.get("host");
    let user = await User.findById(req.user.id);

    user.avatar =  `${url}${user.avatar}`

    // if(!user){ // not need here because it is not possible that user not get his details because this route only access to those who logged in

    // }

    res.status(200).json({
        success: true,
        user
    });
});

//Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    // res.status(200).json({
    //     success: true,
    //     user
    // });

    sendToken(user, 200, res)


})

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    console.log("test_updateprofile", req.user)
    console.log("test_reqSuccess", req.success)
    let newUserData = {
        name: req.body.name,
        email: req.body.email,
        
    };

    if(req.file.filename){

        newUserData.avatar = `/uploads/${req.file.filename}`

    }


    

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    // sendToken(user, 200, res); //No need to send token here
    res.status(200).json({
        success: true,
    });


});

// Get all users  //In case if admin want to see how many users on website

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user  // If admin want to see user details

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);


    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))

    }

    res.status(200).json({
        success: true,
        user,
    });
});


// Update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    // let user = await User.findById(req.params.id)
    const user = await User.findById(req.params.id);


    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))

    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(200).json({
        success: true,

    });
});











//Delete User  --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    console.log(user);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }
    // cloudinary part
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);



    // If user exist
    await user.remove();



    res.status(200).json({
        success: true,
        message: "User deleted Successfully"
    });


});



