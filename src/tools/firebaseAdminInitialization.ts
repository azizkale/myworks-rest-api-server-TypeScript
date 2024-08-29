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

const application2: any = {
  type: type,
  project_id: process.env.p2_project_id,
  private_key_id: process.env.p2_private_key_id,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCZi1TkvF0dx6PX\nuL1xTlWd9Dcp75pQGO6xp4Zlz/xQnKC8ffVXr94BKkO5TuttgYC8i7F03Je3F0eV\nZ5FlD4FxTTkup6o3CkzCuKxcb77v3rgUKMB1tCRWWTjvgE6Soywa4Mp0CFDA+Bkl\nktWwtPHDc+8VbPI0Ng70us7CDzNTUoxlr5Vk4A9kEQC+wS3VpSgnXV7dibStU10s\nKQMnsYEvsaVgArJvwKy8CYUCvO9oC7joZaLZegiqqhpbCaat21GlF5+Hxam1L2It\nRufaeemxK/3/5AEn+PA0SSe9Tg96KPXw+ysdfyiHViYvs3oeBsmQvvb1YJkR6JTd\npOP6A45VAgMBAAECggEAMSJxLDFK6viz6ZhopxWWOFGqRXUzQGZ6G8esLnB8IZ+9\noBP+quzQcjcALRCgLg6/D5b0Vp0wv5pngdv+nwRzO7qmjdOBmNNm9Pj7zyjDRSdU\naL8Rt5jJ+AfdPGcmva4Rsxg0MSVoEhhSk7+FOmLs6sryuzx91U9nQdF10IvktMi6\n0F4CB0qcVwXx2DjkytxM5JJ1nWjYgNcmNHBshz7uVL7z4J3h0tydExV6diMtufHP\nW1DJ+U91OEzjyopDP0NkE7lWqeFxVV+ZeQ8hlWo45H6kL92Va55WmZk98Dsgd8SL\nX4tLxNm1Dtd+woOdQPcP8Y2ksiJHYbSYElXNyIDTEQKBgQDK6F2dbZwo1OXDJLn9\nmXXXohXvA7QS6mA3zDZkDiwl0qEvzZhEDcR5T6Eh8RhqvFmDUs2okjcgNbHTesCI\ncFJEIx0RUfsKOJE1NOoXpp/Uv6bXRdTnard3uoNtjKzz1yHxB7Hi5RJjuhoF63PF\ne4fBFBZthRa2Y+7MOJXDj/I5owKBgQDBuGQN35OKvpnSveHryFqUCagvcx8LWo/X\n8LAO92W/Hv1PvHuvp8cs7uQlA7T5gABqD0TPPHP/Qxd56ESnLnblrPphP/67IyfI\nxOQ6JoZEOUCv/2upLaiQ8FOGzlPa59xz2FwKQdSZusWBdOaAYf3sZ2YzzHyMpYdo\nwveXLqmHpwKBgQCyEJM++ZcGOjdcNpnGFOtWjdajx2M7ClXgAaVlzw4tLxfnJIzQ\nhCh8sUXdzH+6A4qmdX8nxRD9gkGJLntSAQgg5ZO3xHMDODsuLz6T/NTc1kerOYwq\nfft95b863y5UWuJdbHxOeurVe9ckhMk3cD3lUiSQfjA9ZZuFus6rLWLL8wKBgQCh\nYH0hPYYIh91WvM3ugHpMZnsQBCPxbmDz79KKtTeybhtxiD+1RdxbpyqxVxQ04Jf3\nwn588QxksjxlVsOSTdfIX0A5MXl/5bpnuvWxJ5SkUtl7hBjo11tcWogKfelHK+3v\nJ2cNOGfmJLwRqxO2EWvZuw1dy1RaSi6ya/CbpciecwKBgQCGPd2OW+veAZhlP8PV\njlP9gLSkXrg/yq78Mge1BDMjEQjBaNUwxVsSfYk68hITZ+jz5tggdgAV7VfvSAJQ\ncwAMikJdOBKOt5xiyavD/5AyN+KVJ2wu8xq1Olnf9czrCWsyRnBYiWAQEXZHH1YP\nXcpkER97s9aHq4RDvSJ+2YQsxg==\n-----END PRIVATE KEY-----\n",
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
const db_pir = admin.database();
const db_de = admin.database(admin.app("application2"));

export {
  firebaseAdminAppInitializer,
  firebaseAdminAppInitializer2,
  db_de,
  db_pir,
};
