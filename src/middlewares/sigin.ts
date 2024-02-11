import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response } from "express";
import { firebaseApp } from "../tools/firebaseTools";
import * as admin from "firebase-admin";

const auth = getAuth(firebaseApp);

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

    // Verify ID token on the server (optional)
    if (process.env.FIREBASE_VERIFY_ID_TOKENS === "true") {
      await admin.auth().verifyIdToken(idToken);
    }

    // Respond with success message and user data
    const response: any = {
      status: 200,
      message: "Success",
      token: idToken,
      uid: user.uid,
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL,
    };

    // Add roles if they are included in the decoded token and verification is enabled
    if (process.env.FIREBASE_VERIFY_ID_TOKENS === "true") {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log(decodedToken);
      response.roles = decodedToken.roles;
    }

    res.send(response);
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
};

export default { signin };