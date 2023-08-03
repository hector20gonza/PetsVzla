
import User from "../models/users.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/login");
export const renderSigninForm = (req, res) => res.render("auth/register");

export const signup = async (req, res) => {
  

    let errors = [];
    const { name, email, password, confirm_password, telefono } = req.body;
    if (password!==confirm_password) {
   errors.push({text:"Las claves no coiniciden"});

    }
    if (password.length <4) {
        errors.push({text:"Las clave de poseer minimo 4 caracteres"});
    }
    if (errors.length > 0) {
        return res.render("auth/register", {
            errors,
            name,
            email,
            password,
            confirm_password,
            telefono,
          }); 
    }
    //verificamos si el usuario ya existe
    const userencontrado = await User.findOne({ email: email });
    if (userencontrado) {
        req.flash("error_msg","EL email que intenta registrar ya se encuentra en uso")
        return res.redirect("/auth/register");
    }
    // guardar el nuevo usuario
    const newUser= new User({name, email,password,telefono});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "te has registrado con exito");
    return res.redirect("/auth/login");
} 
export const login =passport.authenticate("local",{

    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  });




  
  export const logout = async (req, res, next) => {
    await req.logout((err) => {
      if (err) return next(err);
     req.flash("success_msg", "Has cerrado session.");

   
      res.redirect("/auth/login");
    });
  };