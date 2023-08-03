import { Router } from "express";
import {renderIndex, renderAbout,renderperfil} from '../controller/index.controller.js'

const router = Router();
router.get('/', renderIndex);
router.get('/about', renderAbout );
router.get('/adopcions/:id',renderperfil);
export default router; 