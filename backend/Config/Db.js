import mongoose from 'mongoose';


// mongodb connection

const connectDb = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb Database connected..")
        
    } catch (error) {
        console.error("Database connection failed");
        
    }

}

export default connectDb;