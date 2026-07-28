const { GoogleGenerativeAI } = require('@google/generative-ai');

export default async function handler(req, res) {
  // 1. POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }

  try {
    const { userInput } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // 2. 키 확인
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Vercel에 GEMINI_API_KEY 환경변수가 없습니다. 세팅을 확인해주세요.' 
      });
    }

    // 3. 입력값 확인
    if (!userInput) {
      return res.status(400).json({ error: '사용자 요청이 비어있습니다.' });
    }

    // 4. Gemini AI 호출 설정
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `너는 카페/패스트푸드 스마트 키오스크에 탑재된 AI 바리스타야.
사용자의 요청: "${userInput}"

다음 양식에 맞춰 고객에게 친절하고 명확하게 추천해줘:
[추천 메뉴]
- 음료/메뉴 이름 (예상 가격)

[추천 이유]
- 왜 이 메뉴를 추천했는지 2문장으로 설명

[환상의 꿀조합 디저트]
- 함께 주문하면 좋은 디저트 1가지 추천`;

    // 5. AI 호출 및 결과 반환
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ result: text });

  } catch (error) {
    // 🚨 핵심 포인트: 구글 API에서 발생한 '진짜 에러 내용(error.message)'을 프론트엔드로 전달
    console.error('Gemini Error:', error);
    return res.status(500).json({ 
      error: '구글 AI 호출 에러', 
      details: error.message || '알 수 없는 API 에러가 발생했습니다.' 
    });
  }
}
