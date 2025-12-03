import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        
    },
    lastName:{
        type:String,
        required:true

    },
    email:{
        type: String,
        required: true,
        lowercase : true
    },
    password:{
        type:String,
        required:false
       
    
}
}
)


export const User = mongoose.model("User",UserSchema);