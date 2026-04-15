const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to MongoDB")
    } catch (err) {
        console.log("Error while connecting to DB")
   }
}

connectDB()
