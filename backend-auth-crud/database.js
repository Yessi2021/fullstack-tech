const mongoose = require('mongoose')
require('dotenv').config()



const connectDB = async () => {
    try {
        
   await mongoose.connect(process.env.DATABASE_URL)

   console.log('DB CONNECTED')

    } catch (error) {
        console.log('THE ERROR IS', error)
        throw new Error("Error to  start DB")
    }
};


module.exports = {
    connectDB
}