import express from "express";
import { dirname , join ,extname} from "path";
import exprehbs from "express-handlebars";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import session from "express-session";
import indexRoutes from "./routes/index.router.js";
import AdopcionRoutes from "./routes/adopcion.router.js";
import ComentariosRoute from "./routes/comentarios.router.js";
import AuthRoutes from "./routes/auth.routes.js";
import notifications from "./routes/notifications.router.js";
import MongoStore from "connect-mongo";
import { MONGODB_URI, PORT } from "./config.js ";
import flash from "connect-flash";
import passport from "passport";
import "./config/passport.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

// Initiliazation
 const app= express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// settings 
app.set('port',PORT)
//app.set('ip','192.168.5.5');
app.set("views", join(__dirname,"views"));
const hbs = exprehbs.create({
 defaultLayout:'main',
 layoutsDir: join(app.get("views"),'layouts'),
 partialDir: join(app.get("views"),'partials'),
 extname : '.hbs'

});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"));
const sessionMiddleware = session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGODB_URI }),
})
app.use(sessionMiddleware);
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());
 app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuidv4() + extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));
 
 // Global Variables
 app.use((req, res, next) => {
   res.locals.success_msg = req.flash("success_msg");
 
   res.locals.error_msg = req.flash("error_msg");
   res.locals.error = req.flash("error");
  
   res.locals.user = req.user || null;
   next();
 });
//Routes
app.use( indexRoutes);

app.use(AdopcionRoutes);
app.use(AuthRoutes);
app.use(ComentariosRoute);
app.use(notifications);
//statics files
app.use(express.static(join(__dirname, "public")));
// server listening

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    error,
  });
});



 export default app;