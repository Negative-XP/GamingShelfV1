require("dotenv").config({ path: "./config/.env" });
const cloudinary = require("cloudinary").v2;



cloudinary.config({
  cloud_name: `${process.env.Cloud_NAME}`,
  api_key: `${process.env.Cloud_KEY}`,
  api_secret: `${process.env.Cloud_SECRET}`,
});

module.exports = cloudinary;
