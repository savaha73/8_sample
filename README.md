# 방카(BANGKA) 신메뉴 이벤트 웹사이트

카페 방카의 신메뉴 3종을 소개하고 고객 투표를 진행하기 위한 모바일 우선 웹사이트 프로젝트입니다.

## 바로가기

- [제품 요구사항 문서](./PRD.md)
- [사이트 소스](./sites/bangka-menu-event)
- [배포된 비공개 미리보기](https://bangka-new-menu-2026.silvermusic64.chatgpt.site)

## 현재 구현

- 신메뉴 3종 소개와 상세 정보
- 정상가, 20% 할인가, 이벤트 카운트다운
- 로그인 없는 데모 투표와 득표율 순위
- 모바일 하단 고정 투표 버튼
- 메뉴별 AI 콘셉트 제품 이미지
- 반응형 레이아웃과 접근성 기본 적용

## 로컬 실행

별도의 빌드 과정 없이 `sites/bangka-menu-event/dist`를 정적 HTTP 서버로 실행합니다.

```powershell
cd sites/bangka-menu-event
python -m http.server 4173 -d dist
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 운영 전 연결이 필요한 항목

현재 투표는 브라우저 `localStorage`를 사용하는 데모입니다. 실제 운영 전에는 PRD에 따라 Supabase PostgreSQL, 원자적 투표 RPC, Google 관리자 인증, RLS, Storage 및 실제 매장 정보를 연결해야 합니다.

AI 이미지는 콘셉트 자료이며 실제 제품 촬영본이 준비되면 교체해야 합니다.
