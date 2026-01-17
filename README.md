# NexusDesk AI 코파일럿

Freshdesk를 위한 AI 기반 티켓 분석 도우미 앱입니다.

## 개요

이 앱은 Freshdesk FDK(Freshworks Developer Kit)를 사용하여 개발된 사이드바 앱으로, 티켓 분석 기능을 제공합니다.

## 기능

- 🎯 **티켓 자동 분석**: AI를 활용한 티켓 내용 분석
- 📊 **원인 파악**: 문제의 근본 원인 식별
- ✅ **권장 조치**: 해결을 위한 구체적인 액션 아이템 제시
- 💡 **실시간 스트리밍**: 분석 결과를 실시간으로 표시
- 🌙 **다크 모드**: 라이트/다크 테마 지원
- 📱 **반응형 UI**: 모든 화면 크기에 최적화

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **State Management**: React Query
- **Platform**: Freshdesk FDK 2.3

## 시작하기

### 전제 조건

- Node.js 18.20.5 이상
- npm 또는 yarn
- Freshdesk FDK CLI (`npm install -g fdk-cli`)

### 설치

1. 저장소 클론

```bash
git clone <repository-url>
cd agent-assist-ai
```

2. 의존성 설치

```bash
npm install
```

### 개발 모드 실행

#### 로컬 개발 서버 (Vite)

```bash
npm run dev
```

브라우저에서 `http://localhost:8080` 을 열어 UI를 확인할 수 있습니다.

#### FDK 개발 모드

Freshdesk 환경에서 앱을 테스트하려면:

```bash
npm run fdk:run
```

이 명령어는:
1. 프로덕션 빌드를 생성합니다
2. FDK 로컬 테스트 서버를 시작합니다

FDK CLI가 제공하는 URL을 통해 Freshdesk 개발 환경에서 앱을 테스트할 수 있습니다.

### 빌드

프로덕션 빌드 생성:

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### FDK 앱 검증

```bash
npm run fdk:validate
```

manifest.json과 앱 구조가 FDK 요구사항을 충족하는지 확인합니다.

### FDK 앱 패키징

```bash
npm run fdk:pack
```

Freshdesk 마켓플레이스에 배포하거나 수동 설치를 위한 ZIP 파일을 생성합니다.

## 프로젝트 구조

```
agent-assist-ai/
├── config/              # FDK 설정 파일
│   └── iparams.json    # 앱 설치 매개변수
├── server/              # 서버사이드 코드
│   └── server.js       # FDK 서버 로직
├── src/
│   ├── components/     # React 컴포넌트
│   │   ├── TicketAnalysis/  # 티켓 분석 관련 컴포넌트
│   │   └── ui/        # shadcn/ui 컴포넌트
│   ├── hooks/         # 커스텀 React hooks
│   │   └── use-fdk-client.tsx  # FDK 클라이언트 훅
│   ├── types/         # TypeScript 타입 정의
│   │   └── fdk.d.ts  # FDK 타입 정의
│   ├── lib/          # 유틸리티 함수
│   ├── pages/        # 페이지 컴포넌트
│   ├── App.tsx       # 루트 컴포넌트
│   └── main.tsx      # 진입점
├── public/           # 정적 파일
│   └── icon.svg     # 앱 아이콘
├── manifest.json    # FDK 앱 manifest
├── index.html       # HTML 템플릿
└── vite.config.ts   # Vite 설정
```

## FDK 통합

### FDK 클라이언트 사용

앱에서 FDK 클라이언트를 사용하려면:

```typescript
import { useFDKClient } from '@/hooks/use-fdk-client';

function MyComponent() {
  const { client, isReady, ticketId, ticketData } = useFDKClient();

  if (!isReady) {
    return <div>로딩 중...</div>;
  }

  // FDK 클라이언트 사용
  // ...
}
```

### 티켓 데이터 접근

```typescript
import { useTicketData } from '@/hooks/use-fdk-client';

function MyComponent() {
  const { ticketId, ticketData, refreshTicketData } = useTicketData();

  // 티켓 데이터 사용
  // ...
}
```

## 설정

### 앱 매개변수 (iparams.json)

`config/iparams.json`에서 설정 가능한 매개변수:

- `api_key`: AI 서비스 API 키 (보안)
- `api_endpoint`: AI API 엔드포인트 URL

### 서버사이드 로직

`server/server.js`에서 다음을 구현할 수 있습니다:

- 이벤트 핸들러 (예: `onTicketUpdateHandler`)
- 보안 API 호출
- 데이터 처리 로직

## 테스트

```bash
# 단위 테스트 실행
npm test

# Watch 모드로 테스트
npm run test:watch
```

## 배포

1. 앱 검증:
   ```bash
   npm run fdk:validate
   ```

2. 앱 패키징:
   ```bash
   npm run fdk:pack
   ```

3. 생성된 ZIP 파일을 Freshdesk에 업로드하거나 마켓플레이스에 제출

## 주요 기능 설명

### 스트리밍 UI

`StreamingResult.tsx` 컴포넌트는 AI 분석 결과를 타이핑 효과와 함께 실시간으로 표시합니다.

### 테마 지원

앱은 라이트/다크 모드를 지원하며, 사용자의 시스템 설정을 자동으로 감지합니다.

### 증거 링크

`EvidenceLink.tsx` 컴포넌트는 분석 근거가 되는 메시지를 hover card로 표시합니다.

## 문제 해결

### FDK 클라이언트를 찾을 수 없음

- `index.html`에 FDK 스크립트가 포함되어 있는지 확인
- 앱이 Freshdesk iframe 컨텍스트에서 실행되는지 확인

### 빌드 오류

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 타입 오류

```bash
# TypeScript 설정 확인
npx tsc --noEmit
```

## 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 비공개 프로젝트입니다.

## 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해주세요.

## 참고 자료

- [Freshdesk FDK 문서](https://developers.freshdesk.com/v2/docs/overview/)
- [React 문서](https://react.dev/)
- [Vite 문서](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
