const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(process.env.DATABASE, options);
        console.log("Connected to database.");
    } catch (error) {
        console.log(error, "Could not Connect to Database.");
    }
}   

module.exports = connectDB;