import Publicaciones from "../models/publicaciones.js";






  export const renderIndex  = async(req,res)=>{
    const publicaciones= await Publicaciones.find().sort({ date: "desc" })
    .lean();
    
      res.render("index", { publicaciones });
   }
  
  export const renderAbout = (req, res) => {
    res.render("about");
  };

  export const renderperfil =  async (req,res)=>{

    try {
      const publicacion = await Publicaciones.find({ _id: req.params.id }).populate({
        path: 'comments',
        select: 'body'
        }).sort({ date: "desc" })
      .lean();
      console.log(publicacion);
      res.render('adopcion/perfilandcoment', { publicacion });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al buscar la publicación');
    }
     
  }