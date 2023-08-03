import { Router } from "express";
import {
  renderSignUpForm,
 signup,
 renderSigninForm,
 login,
 logout
 // signin,
//  logout,
} from "../controller/auth.controller.js";

const router = Router();

// Routes
router.get("/auth/login", renderSignUpForm);
router.get("/auth/register", renderSigninForm);
router.post("/auth/register", signup);
router.post("/auth/login", login);
router.get("/auth/logout", logout);
/*


router.get("/auth/signin", renderSigninForm);

router.post("/auth/signin", signin);

router.get("/auth/logout", logout);*/

export default router;
