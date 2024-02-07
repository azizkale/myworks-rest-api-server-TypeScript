const axios = require("axios");

export const lugat = async () => {
  console.log("1");
  axios
    .get(
      "https://lugat.osmanlica.online/?kelime=vabeste&kaynak=browser&sadecehattikuran=false&filitre=Luggat,arap%C3%A7a%20kelimeler&manadaara=false&json=True"
    )
    .then((response: any) => {
      console.log("2");
      console.log(response.data);
    })
    .catch((error: any) => {
      console.error(`Error: ${error.message}`);
    });
};
