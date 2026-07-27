# ☕ AI 스마트 키오스크 (AI Kiosk App)

사용자의 기분, 취향, 상황을 입력받아 Gemini API를 활용해 최적의 음료 및 디저트 조합을 추천해주는 스마트 키오스크 웹 애플리케이션입니다.

## 🚀 Vercel 배포 방법

1. **GitHub 업로드**: 압축을 풀고 본인의 GitHub 계정에 새 레포지토리를 만들어 올립니다.
2. **Vercel 프로젝트 생성**: Vercel Dashboard에서 Add New... -> Project 선택 후 해당 레포지토리를 Import합니다.
3. **환경 변수 설정**: Vercel 환경 변수(Environment Variables)에서 Key: `GEMINI_API_KEY`, Value: `발급받은 키 값`을 설정합니다.
4. **배포 완성**: Deploy 버튼을 누르면 배포 완료!