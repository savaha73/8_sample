# 방카 Vite·React 애플리케이션

방카 신메뉴 출시 이벤트의 React + TypeScript + Vite 구현입니다.

## 실행

```powershell
npm ci
npm run dev
```

## 빌드

```powershell
npm run build
```

## Vercel 설정

- Root Directory: `apps/bangka`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`

`package-lock.json`은 Vite 8과 호환되는 `esbuild@0.28.2`를 고정해 깨끗한 Vercel 환경에서도 동일한 의존성을 설치합니다.
