const mongoose=require("mongoose")


const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter post title"]
    },
    subtitle:{
        type:String
    },
    description:{
        type:String,
        required:[true,"Please enter post description"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    category:{
        type:String,
        required:[true,"Please enter post category"]
    },
    comments:[
        {
            name:{
                type:String,
                required:[true,"Please enter name"]
            },
            comment: {
                type: String,
                required: true,
              },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = mongoose.model("Post",postSchema)