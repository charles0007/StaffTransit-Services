import express from "express";
// import config from "config";
import { logger } from "./Helpers/logger";
import routes from "./routes";
import cors from "cors";
import session from "express-session";
//const session = require("express-session");


var publicDir = require("path").join(__dirname, "/uploads");


const port = process.env.PORT || 89; // config.get("port") as number;
const host = "localhost";//"https://laundryapis.herokuapp.com"; // config.get("host") as string;

const app = express();
// app.use(deserializeUser);
app.use(cors());
app.use((req, res, next) => {
  if (req.is("text/*")) {
    req.body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      req.body += chunk;
    });
    req.on("end", next);
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
// Set up session middleware
app.use(
  session({
    secret: process.env.TOKEN_SECRET, // This is a secret key used to sign the session ID cookie
    resave: false, // Set to false to prevent the session from being saved on every request
    saveUninitialized: true, // Set to true to create a new session for each new user
    cookie: { secure: false }, // Set secure to true for HTTPS connections
  })
);



app.listen(port, () => {
  logger.info(`Server listing at http://${host}:${port}`);

  routes(app);
});
