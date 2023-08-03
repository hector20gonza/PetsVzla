import mongoose from 'mongoose'
import User from '../models/users.js'
import Publicaciones from '../models/publicaciones.js'
import Comentarios from '../models/comentarios.js'

const Schema = mongoose.Schema;
 const notifications = new mongoose.Schema(
    {
      
         autor:{ type: Schema.ObjectId, ref: User},
         publicacion:{type: Schema.ObjectId, ref:Publicaciones},
         comments:{type: Schema.ObjectId, ref:Comentarios},
         read:{type:Boolean , required:true}
 },{
    timestamps: true,
    versionKey: false,
 });


 export default mongoose.model("Notifications",notifications);