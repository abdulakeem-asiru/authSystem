import mongoose from "mongoose";

export async function Connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        connection.on('connected',  ()=>{
            console.log("MongoDB connected successfully")
        })
        connection.on('error', (err) =>{
            console.log('Connection error' + err)
            process.exit();
        })
    } catch (error) {
        console.log("someting went wrong")
        console.log(error)
    }
}