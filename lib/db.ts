import { console } from "inspector";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const connect = async () =>{
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
        console.log("connectd successfully");
        return;
    }

    if(connectionState === 2){
        console.log("connecting ...");
        return;
    }

    try{
        mongoose.connect(MONGODB_URI!, {
            dbName: "nextjs-be",
            bufferCommands: true
        });
        console.log("connected")
    } catch (err: any){
        console.log("Error:", err);
        throw new Error("Error:", err);
    }
}

export default connect;