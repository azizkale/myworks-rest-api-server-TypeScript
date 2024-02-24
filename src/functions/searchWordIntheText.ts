import words from "./word_pairs.json";

const text =
  "Diğer taraftan bu rükünlerdeki her bir inhiraf, –Efen­dimiz’in ifadesiyle– insanı sîreten (iç görünüşü itibarıyla) hayva­niyete götürür. O (sallallâhu aleyhi ve sellem), imamdan önce hareket eden için, “Sizden biri, rukû ve secdede başını imamdan önce kaldırdığı zaman Cenâb-ı Hakk’ın, onun başını merkep başına veya suretini merkep suretine çevire(rek dirilte)ceğinden korkmaz mı?”[5]; acelece yapılan secde için, “Başınızı yem gagalayan karga gibi koyup kaldırmayın!”[6]; teşeh­hütte yanlış oturma şekli için, “Otururken kendinizi köpekler gibi salmayın!”[7] buyurmuştur. Demek ki namaz, insanın, insan-ı kâmil olmasını ifade etmektedir. Bundan dolayı insan, kıldığı namazları bir kere daha yorumlamalı; kıyam, rukû ve secdeyi derinlemesine bütün benliğinde duymaya çalışmalıdır.";

export const searchWord = () => {
  const arrText = text.split(" ");
  let newWordPairsOfText: any = [];

  arrText.forEach((word) => {
    const foundWord = words.find((wordObj) => wordObj.word === word);

    if (foundWord) {
      newWordPairsOfText.push(foundWord);
    }
  });

  console.log("New Word Pairs of Text:", newWordPairsOfText);
};

// Fonksiyonu çağır
searchWord();
