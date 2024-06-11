import * as admin from "firebase-admin";
require("dotenv").config();

const type = "service_account";
const applicationDefault: any = {
  type: type,
  project_id: process.env.p1_project_id,
  private_key_id: process.env.p1_private_key_id,
  private_key: process.env.p1_private_key,
  client_email: process.env.p1_client_email,
  client_id: process.env.p1_client_id,
  auth_uri: process.env.p1_auth_uri,
  token_uri: process.env.p1_token_uri,
  auth_provider_x509_cert_url: process.env.p1_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.p1_client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(applicationDefault),
  databaseURL: process.env.p1_databaseURL,
});

const application2: any = {
  type: type,
  project_id: process.env.p2_project_id,
  private_key_id: process.env.p2_private_key_id,
  private_key: process.env.p2_private_key,
  client_email: process.env.p2_client_email,
  client_id: process.env.p2_client_id,
  auth_uri: process.env.p2_auth_uri,
  token_uri: process.env.p2_token_uri,
  auth_provider_x509_cert_url: process.env.p2_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.p2_client_x509_cert_url,
};

admin.initializeApp(
  {
    credential: admin.credential.cert(application2),
    databaseURL: process.env.p2_databaseURL,
  },
  "application2"
);

const firebaseAdminAppInitializer = admin.auth();
const firebaseAdminAppInitializer2 = admin.auth(admin.app("application2"));
const db2 = admin.database(admin.app("application2"));

export { firebaseAdminAppInitializer, db2, firebaseAdminAppInitializer2 };
