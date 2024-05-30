import OpenAI from "openai";
import { WordPair } from "../models/WordPair";
import { getDatabase, set, ref } from "firebase/database";
import db from "./db.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface sampleWordPair {
  word: string;
  meaning: string;
}

// const text = `
// Lafz-ı Celâl ve İsm-i Âzam da denen “Allah” kelime-i mübarekesi, kendini bize “Esmâ-i Hüsnâ”sıyla bildiren ve sıfât-ı sübhaniyesiyle zihin, mantık ve muhâkemelerimize bir çerçeve vaz’eden, bütün esmânın Müsemmâ-i Akdesi ve bütün evsâf-ı kemaliyenin Mevsûf-u Münezzehi, ulûhiyet tahtının biricik mâliki ve rubûbiyet arşının sahib-i bîmisali Zât-ı Ecell ü A’lâ’nın adıdır. Seyyid Şerif’in de ifade ettiği gibi, “Allah” lafz-ı mübareği “min haysü hüve” Zât-ı İlâhiyenin ism-i hâssıdır ve usûlüddin ulemâsınca o bir ism-i Zât’tır. Aynı zamanda “İsm-i Celâl” ve “İsm-i Âzam” diye de bilinen bu mübarek kelime hususî mânâda “İsm-i Âzam” olarak da zikredilmektedir.

// Zât-ı Ulûhiyet’e ait bütün isimler birer esmâ-i sıfât, “Allah” lafzı ise bir ism-i Zât’tır ve bütün ilâhî isimleri ya bililtizam veya bittazammun ihtiva etmektedir. Şöyle ki, bir insan, “Lâ ilâhe ille’l-Kuddûs.. ille’r-Rahîm.. ille’l-Azîz... ilâ âhir.” gibi cümlelerle imanını ilan etse, bu cümleler esmâ-i hüsnâsıyla mâlum, sıfât-ı sübhaniyesiyle mâruf ve muhât o Zât’ı tam ifade edemediğinden maksat hâsıl olmaz. Zira böyle diyen biri, farkına varsın varmasın, daire-i ulûhiyet ve rubûbiyeti “Kuddûs”, “Rahîm” ve “Azîz” isimlerinin tecellî alanlarına inhisar ettirerek muhîti muhât hâline getirmiş ve bir mânâda daire-i ulûhiyeti tahdit etmiş olur.
// `;

export const getMultipleWordPairs = async (
  text: String,
  listWordPair: Array<any>
): Promise<sampleWordPair[]> => {
  try {
    console.log("text: " + text);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
          Sen iyi bir asistansın. Aşağıdaki metni baştan sona tara ve belirtilen kriterlere uygun kelimeleri tespit et:
          
          Metin: "${text}"
    
          Kriterler:
          - Günümüz Türkçesinde sık veya hiç kullanılmayan
          - Osmanlıca, Arapça, Farsça, Fransızca kökenli olan
          - Bediüzzaman Said Nursi'nin kitaplarında geçen kelimelere benzeyen
          - Risale-i Nur Külliyatı'nda geçen kelimelere benzeyen
          - Fethullah Gülen'in kitaplarında veya vaazlarında geçen kelimelere benzeyen
          - Dini bir terim olabilecek veya olan
    
          Tespit ettiğin kelimeler ve anlamlarını aşağıdaki WordPair interface formatında JSON nesneleri olarak oluştur:
    
          interface WordPair {
            word: string;
            meaning: string;
          }
    
          Bu JSON nesnelerinden bir dizi oluştur ve döndür. Taramayı 5 kez yap ve her seferinde listeyi kontrol et. Var olan kelimeleri listeye ekleme. Her taramada üstteki kriterlere uygun yeni kelimeleri listeye ekle.
          `,
        },
      ],
    });

    const completion = response.choices[0].message?.content;
    if (!completion) {
      throw new Error("No content in completion response");
    }

    // Extract JSON part from response
    const jsonMatch = completion.match(/\[.*\]/s);
    if (!jsonMatch) {
      throw new Error("No JSON array found in completion response");
    }

    const responseData: sampleWordPair[] = await JSON.parse(jsonMatch[0]);
    responseData.forEach(async (w) => {
      let chapterId = "1716917414126";
      let pirId = "5e63d130-af92-11ee-b9c9-a1d0eb730fa3";
      let editorId = "brqj5yJKaye2Mxg1JGb9EIgqqag2";

      let newWordPair = new WordPair(
        w.word,
        w.meaning,
        chapterId,
        pirId,
        editorId
      );

      newWordPair.wordPairId =
        (await Date.now().toString()) +
        Math.floor(Math.random() * 200).toString();

      // await createWordPair(newWordPair);
    });
    return responseData;
  } catch (error) {
    console.error("Error creating completion:", error);
    throw error;
  }
};

const createWordPair = async (wordPair: WordPair) => {
  const db = getDatabase();
  await set(
    ref(
      db,
      "pirs/" +
        wordPair.pirId +
        "/chapters/" +
        wordPair.chapterId +
        "/wordPairs/" +
        wordPair.wordPairId
    ),
    wordPair
  );
};
