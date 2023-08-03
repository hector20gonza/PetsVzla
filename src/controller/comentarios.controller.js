import Publicaciones from "../models/publicaciones.js";
import Comentarios from "../models/comentarios.js";


export const savecmtandpublic = async   (req, res) => {
    const { body } = req.body;
    try {
      const comment = new  Comentarios({ body});
            comment.autor= req.user.id,
            comment.publicacion=req.params.id,
            await comment.save();
           let _id=req.params.id;
            const updatedPost = await Publicaciones.findByIdAndUpdate(
              _id,
              { $push: { comments: comment._id } },
              { new: true }
            ).populate('comments');
            
    
         res.redirect(`/adopcions/${_id}`);
           } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }
  };