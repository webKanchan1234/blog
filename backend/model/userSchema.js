const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please enter your email"],
        validate:[validator.isEmail, "Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Minimum password length is 8 character"]
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next()
    }
    // console.log(this)
    // console.log(this.isModified("password"))  //true false
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.generateToken=function(){
    
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userSchema.methods.passwordMatch = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
};
  

module.exports=mongoose.model("User",userSchema)