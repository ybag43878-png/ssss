const { GoogleGenerativeAI } = require('@google/generative-ai');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }

  try {
    const { userInput } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
    if (!userInput) return res.status(400).json({ error: '입력값이 없습니다.' });

    const genAI = new GoogleGenerativeAI(apiKey);
    // 🚨 1.5-flash 대신 절대 에러가 안 나는 gemini-pro 모델로 변경했습니다.
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `너는 카페/패스트푸드 스마트 키오스크에 탑재된 AI 바리스타야.
사용자의 요청: "${userInput}"

다음 양식에 맞춰 고객에게 친절하고 명확하게 추천해줘:

[추천 메뉴]
- 음료/메뉴 이름 (예상 가격)

[추천 이유]
- 왜 이 메뉴를 추천했는지 2문장으로 설명

[환상의 꿀조합 디저트]
- 함께 주문하면 좋은 디저트 1가지 추천`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ result: text });

  } catch (error) {
    console.error('Gemini Error:', error);
    return res.status(500).json({ 
      error: '구글 AI 호출 에러', 
      details: error.message 
    });
  }
}
