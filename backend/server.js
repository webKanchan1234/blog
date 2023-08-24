const app=require("./app")
const dotenv=require("dotenv")
const databaseConnection = require("./config/database")
const cloudinary=require("cloudinary")
const PORT=5000

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

dotenv.config({path:"./backend/config/config.env"})

databaseConnection()
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, 
});
const server=app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on `,process.env.PORT)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });