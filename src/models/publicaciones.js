import mongoose from  "mongoose";

import User from "../models/users.js";



const Schema = mongoose.Schema;
const publicaciones = new mongoose.Schema(
 {
   nombre:{ type:String, trim:true},
    especie:{type:String , required:true, trim:true},
    edad:{type:Number, required:true},
    sexo:{type:String , required:true, trim:true},
    descripcion:{type:String, required:true},
    foto:{type:String },
    estado:{type:String, required:true},
    precio:{type:Number},
    autor:{ type:Schema.ObjectId, ref: User},
    comments: [{
      type:Schema.ObjectId, ref: 'Comentarios'
  
 }]
 },
 
 
 
 {
    timestamps: true,
    versionKey: false,
  
 }

);
export default mongoose.model("Publicaciones",publicaciones)