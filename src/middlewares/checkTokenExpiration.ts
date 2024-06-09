import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";

const tokenControl = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  const checkRevoked = true;
  try {
    const idToken: any =
      (await req.body.token) || req.headers["authorization"].split(" ")[1];
    // const idToken: any = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYXppeiBrYWxlIiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS82NDQwODM2MT92PTQiLCJyb2xlcyI6WyJhZG1pbiIsIm1lbnRvciIsImVkaXRvcl9waXIiXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL215d2Vic2l0ZS0zZjUyNyIsImF1ZCI6Im15d2Vic2l0ZS0zZjUyNyIsImF1dGhfdGltZSI6MTcxNzc3ODgwOSwidXNlcl9pZCI6ImJycWo1eUpLYXllMk14ZzFKR2I5RUlncXFhZzIiLCJzdWIiOiJicnFqNXlKS2F5ZTJNeGcxSkdiOUVJZ3FxYWcyIiwiaWF0IjoxNzE3Nzc4ODA5LCJleHAiOjE3MTc3ODI0MDksImVtYWlsIjoiYXppemthbGVAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXppemthbGVAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.edahmU6Pkiq3_D3xtwFLmSv-c7KL8rQWSnI8zpVkec4RG_RrU4xue_dKgan4HRyzSfYNH8NAGh7wFfzLUEimvBoyTvRjZCbagf-qrfYrBx5nhf5NGVpSP06-P_N6Fb5NlycaozJTeq5qgDr653N_zM3Djebga8AvoJLwzHeaQThovA5oP-uTDR3J2tvKCCKbl9GYl_eAbwoSUILtSNUVO2J_ndSlJMY3g7nKb8eIt7Zsi4-15lJw5OK-QkfSMPj6fJv7BBGeDAX7mKg914jDNMs4iT1tlrCwmHdKKKNxX09AaxjLSFIQbTeJYheppYP-Z_8pGDuJ-WzFmRFEagB0Jw`;

    admin
      .auth()
      .verifyIdToken(idToken, checkRevoked)
      .then((payload) => {
        // Token is valid.
        next();
      })
      .catch((err: any) => {
        // Token expired or invalid
        if (err.code === "auth/id-token-expired") {
          return res
            .status(401)
            .json({ message: "Token expired", code: "token-expired" });
        }
        return res.status(401).send(err.message);
      });
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
};

export default tokenControl;
