import { Router } from "express";
import {renderpetsdopcion,renderpetsinadop,createpublic ,renderpublicall} from "../controller/adopcion.controller.js"
import {renderperfil} from '../controller/index.controller.js'

const router = Router();
router.get("/adopcion/publicanimal", renderpetsdopcion);
router.get("/adopcion/petsinadop", renderpetsinadop);
router.post("/adopcion/publicanimal", createpublic);
router.get("/adopcion/publicaciones", renderpublicall);
router.get('/adopcion/:id',renderperfil);
export default router;