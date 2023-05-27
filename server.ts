import express from 'express';
import cors from 'cors';
const app = express();
import { checkUser } from "./src/functions/checkUser";
import userroutes from './src/routes/users/userroutes';
import bookroutes from './src/routes/works/Book/bookroutes';
import hatimroutes from './src/routes/Hatim/hatimroutes'
import settingsroutes from './src/routes/settings/settingsroutes'
import shbroutes from './src/routes/works/Shb/shbRoutes'
import pirroutes from './src/routes/works/pir/pirroutes'
import generalroutes from './src/routes/general/generalroutes'
import grouprotes from './src/routes/group/grouproutes'
import displayroutes from './src/routes/displays/pir/pirroutes'
import { removeRole } from './src/functions/role_remove';
import { addRole } from './src/functions/role_add';

const port = process.env.PORT || 3000;

require('dotenv').config();
const corsOptions = {
  origin: [
    "https://mywebsite-3f527.firebaseapp.com",
    "http://localhost:4200",
    "https://mywebsite-3f527.web.app/",
    "http://192.168.0.17:4200"
  ],
  default: "http://localhost:4200",
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
// app.use(morgan('dev'));

/** RULES OF API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

// #########################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
let options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["views/signin.html"],
  maxAge: "1m",
  redirect: false,
};
app.use('/', express.static("public", options));

/** Routes */
app.use('/', userroutes);
app.use('/', bookroutes);
app.use('/', hatimroutes);
app.use('/', settingsroutes)
app.use('/', shbroutes)
app.use('/', pirroutes)
app.use('/', generalroutes)
app.use('/', displayroutes)
app.use('/', grouprotes)


app.get("/checkuser", (req, res) => {
  checkUser("azizkale@hotmail.com");
});

app.get("/checkrole", (req, res) => {

});

app.get("/addrole", (req, res) => {
  const { uid, role } = req.query
  addRole(uid, role);
});

app.get("/removerole", (req, res) => {
  const { email, role } = req.query
  removeRole(email, role);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
