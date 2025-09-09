const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || "mongodb+srv://Tech_sis:techSis123@verifact.pmichrn.mongodb.net/bible-ai?retryWrites=true&w=majority&appName=verifact";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

module.exports = connectDB;