import mongoose from "mongoose"

import User from "../models/users.js";
import Publicaciones from "../models/publicaciones.js";

const Schema = mongoose.Schema;
 const comentarios = new mongoose.Schema(
    {
        body: {type: String},
         autor:{ type: Schema.ObjectId, ref: User},
         publicacion:{type: Schema.ObjectId, ref:Publicaciones}
 },{
    timestamps: true,
    versionKey: false,
 });


 export default mongoose.model("Comentarios",comentarios);