# 방카 신메뉴 이벤트 MVP

PRD를 바탕으로 만든 모바일 우선 고객용 프로토타입입니다.

## 현재 구현

- 신메뉴 3종 소개 및 상세 정보
- 이벤트 기간, 할인 가격, 남은 시간
- 로그인 없는 데모 투표와 득표율 결과
- 중복 투표 허용, 다시 투표하기
- 모바일 하단 고정 투표 버튼
- 미입력 실매장 정보의 명확한 placeholder 처리
- 메뉴별 AI 콘셉트 제품 사진과 AI 이미지 식별 표기

## 이미지 에셋

- `dist/assets/menu-mix-cream-v2.png`
- `dist/assets/menu-banana-latte-v2.png`
- `dist/assets/menu-black-sesame-v2.png`

이미지는 PRD의 따뜻한 감성 카페 방향에 맞춰 생성한 콘셉트 사진입니다. 실제 제품 촬영본이 준비되면 동일 파일 참조 위치에서 교체할 수 있습니다.

## 중요한 제한

현재 공개본의 투표는 브라우저 `localStorage`에 저장되는 데모입니다. 실제 운영 전 Supabase의 원자적 투표 RPC, 관리자 Google OAuth, RLS, 이미지 Storage, 감사 로그를 연결해야 합니다. 콘셉트 이미지도 실제 촬영 사진으로 교체해야 합니다.

## 로컬 실행

`dist` 폴더를 정적 HTTP 서버로 실행합니다.
