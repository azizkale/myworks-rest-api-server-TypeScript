import * as admin from "firebase-admin";
require("dotenv").config();

const type = "service_account";
const applicationDefault: any = {
  type: type,
  project_id: process.env.p1_project_id,
  private_key_id: process.env.p1_private_key_id,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhccnHpP22YXd8\nTFzcYNdCaJRubZ+kdrH0zhmvkS8+LuBSBcECFPdKZ2hNZRsjbAWwq/C7/nEY+psq\nQt4uxdWjg+v70sHykrGvqIvQPzf9cb6TQE6z7PW/I5PoGeHqydU0lfKvZpGngEeG\ndFISTHOVqYI4Er5kwuO4GRZMVscJRuat2ED/PbeqBNfL60w2bYv+vrg3WubBKLPh\nI7MXQox/Lpn3JVuYIxkkQgrmOTg1jWuu4/9qSDEwiegdHaDdn6pkyIult4C6G99T\nrAK9YDjmR1FAxKKoc60neuQkBe3F5aNgnN2FDR8pe5MHjcMNFaSMXL9qSbU+Wwkr\nAXQJm1A5AgMBAAECggEAC9P+gms4+rf8nt/Fc+01OnoQ2HeyJ9zTRWF584VGvJix\ndnipCNMmjlCSmCJDa1rK3vei4YvsMOqlFI3hk66l9ihIL1Cayw3AlwxOxEC7Fi8I\nAqo6L8CxZrNsRSyC6MQwW69/qan+3zzn9Y6fBCj7lNEJ7Rlwbu3Stv3C2mbustoH\nIYGbsveJFDLsMmvrRpE4exSppSgFxp7cup+YUv3vu0pNnKWGTFMouK+LbLN7SAqt\nfD8vezhKRak2ZSE/v+bDk1poIqa4HEurIsZouJsacPOy3KTCecp1Q7FpJ+TU4Tla\nGeh0lJjzxJSitgga6+bmPM43iqSSoiULV9Zu11gbiQKBgQDxANACSZfR4G/8/hK9\nlady2TESFSlECB+2Z9RPezIdERJaCe+hpZ13fG/oG/qZbNGFRVEtyDKqassh2n7x\n2qiQRFyTvak8uirJPjis6BPHlp2MuiGOYRR/ROyrvTjW1GhLAS2TKCmXbe00kc8c\nxhNeFs+WiPXM+f0yiVsIphSR0wKBgQDveSAUR1EvHiz4+zQbOVB8IRVyDAgnezE1\nrqj1hoUSq6esSp7qPJne6qBHGrwIQrTWZOyP+BoMRvusF/5UqBydhJYQUHC77Luj\nhtE7d7vDBceP/J04wKSW5qyy9/vnY5U4XSBq3IjnIew7SQuxzwWOqrFquzMelJE/\npIuqV6SCQwKBgQCY21oTSVgYztBY11FNm8DkECuWe4N72ec7SymW692CIBTStOCf\nVyrD4VIdFrngW+ucKrXtYr/35NpH84x2m6g0MJfDQRU5Jh8DGwrZaC07dyUgX+Hu\nq1ZTzoSJ/O8zGu+3Ot0MK/oNSLSdlimV52/bSn6JzP6R7rEQP5xUpPoA7wKBgF6i\npF2/LUMMjsM6KoZTqQ3U2S+/t306vuCzDEwzA+Wz9kgtGQ4CMuCYIgzXcNVm3yYW\nrjHa3xhY+N4ygSydXumU2uTJlTN+w0xFW+w/TfEtGIc7Ujp6TtDfigIT4/W2MeMb\nUlNIocWNb1iibj+vS0ftBr3iCrqcBaZ79UG07usXAoGBAM8y3FElJhIJjbO5oGGU\nHbTqawcYED49tOvmVDWE1bQUipEG7eTBpQQir923LQcROzP0AeAAAOuc2Irtbvbh\nyh25hv+562wVjycn/rtiCBkORLuUEWwTyTR6Nh5Awiq4z+YrJTcVe0UnMyZvc+e/\nC9jc7t4iX09/Y6RY4XDmnZCD\n-----END PRIVATE KEY-----\n",
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

const firebaseAdminAppInitializer = admin.auth();
const db_pir = admin.database();

export { firebaseAdminAppInitializer, db_pir };
