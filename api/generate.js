const { GoogleGenerativeAI } = require('@google/generative-ai');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }

  try {
    const { userInput } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `너는 카페/패스트푸드 스마트 키오스크에 탑재된 AI 바리스타야.
사용자의 요청/상태: "${userInput}"

다음 양식에 맞춰 고객에게 친절하고 명확하게 추천해줘:

[추천 메뉴]
- 음료/메뉴 이름 (예상 가격)

[추천 이유]
- 고객의 기분/요청에 맞춰 왜 이 메뉴를 추천했는지 2문장으로 설명

[환상의 꿀조합 디저트]
- 함께 주문하면 좋은 디저트 1가지 추천`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ result: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'AI 메뉴 추천 생성에 실패했습니다.' });
  }
}