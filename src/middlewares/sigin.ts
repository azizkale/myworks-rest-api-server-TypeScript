import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response } from "express";
// import firebaseApp from "../tools/firebaseAdminInitialization";
import * as admin from "firebase-admin";
import { updateIdToken } from "../functions/updateIdToken";

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
    //stores idToken within .env files
    updateIdToken(idToken);

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
    if (process.env.ID_TOKEN) {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      response.roles = decodedToken.roles;
      console.log(response);
    }

    res.send(response);
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
};

export default { signin };
