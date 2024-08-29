import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response } from "express";
// import firebaseApp from "../tools/firebaseAdminInitialization";
import * as admin from "firebase-admin";
import { updateIdToken } from "./updateIdToken";
import axios from "axios";

const auth = getAuth();

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = await req.body;

    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential.user) {
      throw new Error("User not found or incorrect credentials");
    }

    // Extract user and token information
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    const refreshToken = userCredential.user.refreshToken;

    //stores idToken within .env files
    updateIdToken(idToken);

    // Respond with success message and user data
    const response: any = {
      status: 200,
      message: "Success",
      token: idToken,
      refreshToken: refreshToken,
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL,
    };

    // Add roles if they are included in the decoded token and verification is enabled
    if (process.env.ID_TOKEN) {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      response.roles = decodedToken.roles;
    }

    res.send(response);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

const getRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).send("Refresh token is required");
  }

  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}`,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }
    );

    const newAccessToken = response.data.id_token;
    const newRefreshToken = response.data.refresh_token;

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error: any) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error.message
    );
    res.status(401).send("Invalid refresh token");
  }
};

export default { signin, getRefreshToken };
