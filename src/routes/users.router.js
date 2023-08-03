import { Router } from "express";


const router =Router();
router.get('/auth/login',(res,req)=>{
    req.send('<h1> LOGIN DE USUARIO ACA <h1/>')
})
router.get('/auth/register',(req,res)=>{
    req.send('<h1> FORMULARIO DE REGISTRO<h1/>')
})


export default router;