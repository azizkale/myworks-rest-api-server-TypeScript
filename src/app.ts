import express from "express";
import cors from "cors";

const app = express();
import userroutes from "./routes/userroutes";
import bookroutes from "./routes/bookroutes";
import hatimroutes from "./routes/hatimroutes";
import settingsroutes from "./routes/settingsroutes";
import shbroutes from "./routes/shbRoutes";
import pirroutes from "./routes/pirroutes";
import generalroutes from "./routes/generalroutes";
import grouprotes from "./routes/grouproutes";
import displayroutes from "./routes/pirroutes";
import { removeRole } from "./middlewares/role_remove";
import lugatrotes from "./routes/lugatroutes";

const port = process.env.PORT || 3000;

require("dotenv").config();

const corsOptions = {
  origin: [
    "https://mywebsite-3f527.firebaseapp.com",
    "http://localhost:4200",
    "https://mywebsite-3f527.web.app",
    "http://192.168.0.17:4200",
    "192.168.178.111:4200",
  ],
  default: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/", userroutes);
app.use("/", bookroutes);
app.use("/", hatimroutes);
app.use("/", settingsroutes);
app.use("/", shbroutes);
app.use("/", pirroutes);
app.use("/", generalroutes);
app.use("/", displayroutes);
app.use("/", grouprotes);
app.use("/", lugatrotes);

app.get("/removerole", (req, res) => {
  const { email, role } = req.query;
  removeRole(email, role);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
