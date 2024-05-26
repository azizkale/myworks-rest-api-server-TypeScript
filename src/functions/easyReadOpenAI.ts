import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface WordPair {
  word: string;
  meaning: string;
}

const text = `Yolcuda, yolculuk düşüncesi, dünya endişesi ve mesâfeler mülâhazası bâkî kaldığı sürece; tâbir-i diğerle, yolcu tecelli-i esmâ ve sıfâtı aşıp tecelli-i Zât'la şereflendirileceği "ân"a kadar, ateş ve şürb, yanıp-yakılma ve perde arası cilvelerle وَسَقَاهُمْ رَبُّهُمْ شَرَابًا طَهُورًا"Rabbileri onlara tertemiz bir şarap sunmuştur."[1] nasibini alıp mârifet vâdilerinde "mezîd" arama devam eder. Böyle bir sînede her yeni vâridat, yeni yeni iştiyak menfezleri açar.. her açılan menfezden onun gözüne-gönlüne ışıklar akar-gelir. Onun duygu ve düşüncesi, eşyâ ve gönlü arasında bir tığ gibi işler ve kendi mârifet kanaviçesini örer.`;

export const myAI = async () => {
  const completion: any = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `sen iyi bir asistansin. ${text} text indeki, günümüz Türkçe'sinde sık kullanılmayan, Osmanlıca, Arapça, Farsça kökenli; Risale-i Nur külliyatinda geçen, Bediüzzaman'ın ve Fethullah Gülen'in kitaplarinda gecen ama günümüz Türkçe'sinde sık veya hiç kullanılmayan tüm kelimeleri tespit edip, kelimeleri ve günümüz Türkçesi'ndeki anlamlarını bir JSON nesnesi olarak 
          yukarıda tanımlı WordPair Interface tipinde nesneler yapıp bu nesnelerden bir dizi oluştur musun?`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // JSON olarak dönen içeriği ayrıştır
  const responseData = JSON.parse(completion.choices[0].message.content);
  return responseData;
};
