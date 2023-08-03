import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const users = new mongoose.Schema(
  { 
    name:{ type:String, trim:true},
   email:{type:String , required:true, trim:true},
    password:{type:String, required:true},
   telefono:{type:Number, required:true}

 },
 {
    timestamps: true,
    versionKey: false,
 }


);
users.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  users.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  export default mongoose.model("User", users);