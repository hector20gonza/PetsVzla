import { Router } from "express";
import {savecmtandpublic} from  "../controller/comentarios.controller.js"
const router = Router();
router.post('/adopcion/comentarios/:id', savecmtandpublic);
export default router;

