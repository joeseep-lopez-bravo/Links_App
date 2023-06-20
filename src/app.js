import express from "express";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import  pool from './db.js';

import exphbs from 'express-handlebars';
import path from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import passport from 'passport';

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.js";

import  helpers  from "./lib/handlebars.js";

const app = express();
import './lib/passport.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); //acepta desde el formulario los datos que envian los usuarios
app.use(express.json());
/* app.use(session({
    secret:'password',
    resave: false,
    saveUninitialized: false,
    store: new (MySQLStore(session))({
        createDatabaseTable: true,
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }),
})); */
/*app.use(flash());
 app.use(passport.initialize());
app.use(passport.session()); */

//settings

app.set('views',path.join(__dirname, 'views'))// les dice donde se encuentra la carpeta views
app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'),'partials'),
        adminDir: path.join(app.get('views'),'admin'),
        extname : '.hbs',
        helpers: helpers
    }));
app.set('view engine', '.hbs');


//global Variables
/* 
app.use((req,res,next) =>{
  app.locals.success=req.flash('success');
  app.locals.message=req.flash('message');
  app.locals.user =req.user;
  next(); 
});*/
// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;