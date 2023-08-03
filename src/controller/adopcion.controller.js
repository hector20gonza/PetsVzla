import Publicaciones from "../models/publicaciones.js";



export const renderpetsdopcion = (req, res) => {
    res.render("adopcion/publicanimal")
    
  };
  
  export const renderpetsinadop = (req, res) => {
    res.render("adopcion/petsinadop")
  };
  export const createpublic = async (req, res)=>{
    const {nombre,especie,edad,descripcion,sexo}= req.body;
    const errors=[];
    if(!nombre){
     errors.push({text:"Por favor ingrese un nombre"});
    }
    if(!especie){
      errors.push({text:"Por favor Seleccione una especie"});
    }
    if(!edad){
      errors.push({text:"Por favor ingrese una edad"});
    }
    if(!descripcion){
      errors.push({text:"Por favor ingrese una descripcion del animal"});
    }
    if(!sexo){
      errors.push({text:"Por favor ingrese una descripcion del animal"});
    }
    if(errors.length >0)
    return res.render("adopcion/publicanimal",{

      errors,
      nombre,
      edad,
      descripcion,
      especie
    });
       const savepublic = new Publicaciones({nombre,edad,especie,descripcion,sexo});
       savepublic.foto='/img/uploads/' + req.file.filename;
       savepublic.autor=req.user.id;
       savepublic.estado="Disponible";
       await savepublic.save();
       req.flash("success_msg", "Publicacion exitosa");
    res.redirect("/");
   };

   export const renderpublicall = async(req,res)=>{
    const publicaciones= await Publicaciones.find({ autor: req.user.id }).sort({ date: "desc" })
    .lean();
    
      res.render("adopcion/publicaciones", { publicaciones });
   };
