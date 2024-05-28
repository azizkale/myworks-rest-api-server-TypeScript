import express from "express";
import cors from "cors";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./tools/firebaseClientInitialization";
import firebaseAdminAppInitializer from "./tools/firebaseAdminInitialization";
import { myAI, asd } from "./functions/easyReadOpenAI";

const app = express();
import userroutes from "./routes/userroutes";
import bookroutes from "./routes/bookroutes";
import hatimroutes from "./routes/hatimroutes";
import settingsroutes from "./routes/settingsroutes";
import shbroutes from "./routes/shbRoutes";
import pirroutes from "./routes/pirroutes";
import pireditroutes from "./routes/pireditroutes";
import generalroutes from "./routes/generalroutes";
import grouprotes from "./routes/grouproutes";
import displayroutes from "./routes/pirroutes";
import { removeRole } from "./middlewares/role_remove";
import lugatrotes from "./routes/lugatroutes";
import questionroutes from "./routes/questionroutes";

const port = process.env.PORT || 3001;

require("dotenv").config();

const corsOptions = {
  origin: [
    "https://mywebsite-3f527.firebaseapp.com",
    "http://localhost:4200",
    "https://mywebsite-3f527.web.app",
    "http://192.168.0.17:4200",
    "http://89.58.18.182:4001",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  default: "http://localhost:4200",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/", userroutes);
app.use("/", bookroutes);
app.use("/", hatimroutes);
app.use("/", settingsroutes);
app.use("/", shbroutes);
app.use("/", pireditroutes);
app.use("/", pirroutes);
app.use("/", generalroutes);
app.use("/", displayroutes);
app.use("/", grouprotes);
app.use("/", lugatrotes);
app.use("/", questionroutes);

app.get("/hi", async (req, res, next) => {
  myAI()
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

app.get("/", async (req, res, next) => {
  try {
    await firebaseAdminAppInitializer.getUser(""); //user not necessary, just to initialize firebase admin SDK
    const auth = getAuth(firebaseApp); // to initilize firebase client SDK
    res.status(200).send("Operations completed successfully.");
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/removerole", (req, res) => {
  const { email, role } = req.query;
  removeRole(email, role);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
