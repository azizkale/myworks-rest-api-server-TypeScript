import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

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


const usersYamlFilePath = require('path').resolve(__dirname, './src/routes/users/users.yaml')
const usersSpec = yaml.load(fs.readFileSync(usersYamlFilePath, 'utf8'));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'My Works Library API',
      termsOfService: '',
      contact: {
        name: 'API Support',
        url: '',
        email: '',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'My Works API Documentation',
      },
    ],
    ...usersSpec,
  },
  apis: ['./src/routes/users/userroutes.ts'],
};
const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
