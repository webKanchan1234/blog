const catchAsyncError = require("../middlware/catchAsyncError")
const User = require("../model/userSchema")
const ErrorHandler = require("../utils/errorHandler")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const sendEmail2 = require("../utils/sendEmail2");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary");


//sign up user
exports.signUpUser = catchAsyncError(async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail', // or another email service
    auth: {
      user: 'kanchankr15153795@gmail.com',
      pass: 'afhhepakdbpbvxuu',
    },
  });
  const { name, email, password } = req.body

  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

  const image = {
    public_id: "public id",
    url: "url"
  }
  const user = await User.create({
    name, email, password, image, verificationToken
  })
  const token = user.generateToken()
  // const verificationToken = user.generateToken()
  // Send verification email
  // console.log(req.protocol)
  // console.log(req.get("host"))
  const verificationLink = `https://www.blogdirectorio.com/verify/${verificationToken}`
  const mailOptions = {
    from: 'kanchankr15153795@gmail.com',
    to: email,
    subject: 'Verify Your Account',
    text: `Click the link to verify your account: ${verificationLink}`,
  };

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Only send the response after the email is sent successfully
  await transporter.sendMail(mailOptions);

  res.status(201).cookie("token", token, options).json({
    message: 'User registered, verification email sent',
  });


})
exports.verificationMail = catchAsyncError(async (req, res, next) => {
  // console.log(req.params)
  const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
  const email = decoded.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  user.isVerified = true;
  user.verificationToken = null; // Remove the verification token
  await user.save();
  res.status(200).json({ message: 'Account verified successfully' });

  // res.status(400).json({ message: 'Invalid or expired token' });

})

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) {
    return next(new ErrorHandler("User not found with this id: ", 400))
  }
  console.log(user)
  if (!user.isVerified) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: 'gmail', // or another email service
      auth: {
        user: 'kanchankr15153795@gmail.com',
        pass: 'afhhepakdbpbvxuu',
      },
    });
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const verificationLink = `https://www.blogdirectorio.com/verify/${verificationToken}`
    const mailOptions = {
      from: 'kanchankr15153795@gmail.com',
      to: email,
      subject: 'Verify Your Account',
      text: `Click the link to verify your account: ${verificationLink}`,
    };

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    // Only send the response after the email is sent successfully
    await transporter.sendMail(mailOptions);
    return next(new ErrorHandler("An email sent to your account. Please verify it."))
    
  }
  if (user === "" || password === "") {
    return next(new ErrorHandler("Please enter email or password: ", 400))
  }
  
  const isPasswordMatch = await user.passwordMatch(password)
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Email or password is incorrect ", 400))
  }

  const token = user.generateToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token
  })
})

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out successfully",
  });
})

//forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail', // or another email service
    auth: {
      user: 'kanchankr15153795@gmail.com',
      pass: 'afhhepakdbpbvxuu',
    },
  });
  const user = await User.findOne({ email: req.body.email });
  // console.log(user)
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  // Generate a reset token
  // const resetToken = crypto.randomBytes(32).toString('hex');
  // const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  // user.resetPasswordToken = resetToken;
  // user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  // console.log(user)

  

  const verificationLink =`https://www.blogdirectorio.com/password/reset/${resetToken}`

  const mailOptions = {
    from: 'kanchankr15153795@gmail.com',
    to: req.body.email,
    subject: 'Reset Password',
    text: `Your password reset token is: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    message: 'Reset password token sent to email',
  });

  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  


  // const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: `Ecommerce Password Recovery`,
  //     message,
  //   });

  //   res.status(200).json({
  //     success: true,
  //     message: `Email sent to ${user.email} successfully`,
  //   });
  // } catch (error) {
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpire = undefined;

  //   await user.save({ validateBeforeSave: false });

  //   return next(new ErrorHandler(error.message, 500));
  // }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  const token = user.generateToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  await user.save();
  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token
  })
});

//get users
exports.allUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    users
  })
})

//get user details
exports.userDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user
  })
})

//get single user
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler("User not found with this id: ", 400))
  }
  res.status(200).json({
    success: true,
    user
  })
})

//update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.passwordMatch(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;
  const token = user.generateToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  await user.save();
  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token
  })
})


//update user details
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
  // console.log(req.params.id)
  // console.log(req.body)
  let user = await User.findById(req.user.id)
  if (!user) {
    return next(new ErrorHandler("User not found with this id: ", 400))
  }
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  // const img = {
  //   public_id: myCloud.public_id,
  //   url: myCloud.secure_url,
  // };

  // req.body.image=img
  // console.log(req.body)
  user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  // await user.save()
  // console.log(user)
  res.status(200).json({
    success: true,
    user
  })
})


//update user details
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("User not found with this id: ", 400))
  }

  await User.findByIdAndRemove(req.params.id)
  res.status(200).json({
    success: true,
    message: "User Deleted successfully"
  })
})

//verification email



//contact us
exports.contactUs = catchAsyncError(async (req, res, next) => {

  const { name, email, mobile, message, link } = req.body
  const obj = {
    name: name,
    email: email,
    mobile: mobile,
    message: message,
    link: link
  }
  // console.log(obj)
  // Get ResetPassword Token
  let stringMessage = JSON.stringify(obj);
  // console.log(stringMessage)
  try {
    await sendEmail2({
      email: email,
      subject: `Contact with you`,
      stringMessage,
    });

    res.status(200).json({
      success: true,
      message: `Message send successfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
