# GNU 14th Backend Hackathon Template

경상국립대학교 14기 백엔드팀을 위한 24시간 해커톤 스타터 템플릿입니다.

이 저장소의 목적은 하나입니다. 해커톤 당일에 환경 구축, 인증 세팅, API 라우팅, DB 연결, 폴더 구조 결정에 시간을 쓰지 않고 팀이 바로 핵심 기능 개발에 들어가게 만드는 것입니다.

백엔드팀 리더로서 반복되는 초기 세팅을 미리 정리해 두었고, 팀원들은 이 템플릿을 기준으로 필요한 도메인만 바꿔서 개발을 시작하면 됩니다.

## 왜 만들었나요?

해커톤은 시간이 짧습니다. 특히 24시간 해커톤에서는 기술 선택보다 구현 속도와 팀 합의가 더 중요합니다.

매번 새 프로젝트를 만들 때마다 다음 작업에 시간이 빠집니다.

- 프로젝트 생성과 폴더 구조 결정
- 인증 방식 선택
- API 라우팅 방식 결정
- 데이터베이스 연결
- ORM 설정
- 요청값 검증
- 프론트엔드와 백엔드 연결 방식 합의
- 배포 가능한 Next.js 구조 정리

이 템플릿은 위 작업을 미리 끝내 두어, 팀이 문제 정의와 기능 구현에 더 많은 시간을 쓸 수 있게 합니다.

## 해커톤에서 좋은 이유

### 1. 바로 개발을 시작할 수 있습니다

Next.js, API 라우팅, Supabase 인증, Drizzle ORM, PostgreSQL 연결 구조가 이미 준비되어 있습니다. 팀원은 프로젝트 구조를 새로 설계하지 않고, 주어진 예시를 자기 서비스 도메인에 맞게 바꾸면 됩니다.

### 2. 프론트엔드와 백엔드 연결이 단순합니다

Hono 기반 API와 타입 추론 가능한 클라이언트 구조를 사용합니다. 프론트엔드에서 서버 API를 호출하는 흐름이 명확해서, 짧은 시간 안에 팀원 간 역할 분담이 쉽습니다.

### 3. 인증과 DB를 처음부터 고려합니다

대부분의 서비스는 로그인, 사용자 정보, 데이터 저장이 필요합니다. 이 템플릿은 Supabase Auth와 Drizzle ORM 기반 DB 구조를 포함하고 있어, 나중에 급하게 붙이는 방식보다 안정적으로 기능을 확장할 수 있습니다.

### 4. 검증과 유지보수 비용을 줄입니다

Zod와 React Hook Form을 사용해 입력값 검증 흐름을 잡아 두었습니다. 해커톤 후반에 자주 발생하는 "값이 이상하게 들어와서 터지는 문제"를 줄일 수 있습니다.

### 5. 발표 가능한 화면까지 빠르게 만들 수 있습니다

Tailwind CSS, shadcn/ui 계열 컴포넌트, lucide-react 아이콘을 기반으로 기본 UI를 빠르게 구성할 수 있습니다. 백엔드 기능만 만든 뒤 화면이 없어 보여주지 못하는 상황을 줄이는 데 도움이 됩니다.

## 기술 스택

| 영역 | 사용 기술 | 선정 이유 |
| --- | --- | --- |
| Framework | Next.js 16 App Router | 프론트엔드, API Route, 배포 구조를 하나의 프로젝트에서 관리할 수 있어 해커톤에 적합합니다. |
| Language | TypeScript | API 응답, 폼 데이터, DB 모델을 타입으로 관리해 짧은 시간 안에 실수를 줄입니다. |
| Runtime / Package Manager | Bun | 설치와 실행 속도가 빠르고, 해커톤 환경에서 초기 대기 시간을 줄일 수 있습니다. |
| API Server | Hono | 가볍고 빠르며 라우팅 구조가 명확합니다. Next.js API Route 안에서 백엔드 엔드포인트를 깔끔하게 구성할 수 있습니다. |
| API Client | hono/client | 서버 라우트 타입을 프론트엔드에서 활용할 수 있어 API 계약을 맞추기 쉽습니다. |
| Authentication | Supabase Auth | 이메일 인증, 세션 관리, 서버/클라이언트 연동을 빠르게 붙일 수 있습니다. |
| Database | PostgreSQL | 실제 서비스 확장까지 고려할 수 있는 범용 RDB입니다. Supabase와 조합하기 좋습니다. |
| ORM | Drizzle ORM | 스키마를 TypeScript 코드로 관리할 수 있고, SQL에 가까운 방식이라 백엔드 학습에도 좋습니다. |
| Validation | Zod | API 요청값과 폼 입력값을 같은 방식으로 검증할 수 있습니다. |
| Form | React Hook Form | 폼 상태 관리가 가볍고, Zod와 결합하기 쉽습니다. |
| Server State | TanStack Query | API 데이터 로딩, 캐싱, 로딩/에러 상태 처리를 빠르게 구현할 수 있습니다. |
| Styling | Tailwind CSS 4 | 빠르게 UI를 만들고 수정하기 좋습니다. 팀원 간 CSS 충돌도 줄일 수 있습니다. |
| UI | shadcn/ui, Base UI, lucide-react | 기본 컴포넌트와 아이콘을 빠르게 조합해 발표 가능한 화면을 만들 수 있습니다. |

## 현재 포함된 기능

- Next.js App Router 기반 프로젝트 구조
- Hono 기반 API 라우트 예시
- `/api/hello` 기본 API
- `/api/tasks` CRUD 예시
- Zod 기반 요청값 검증
- Supabase 클라이언트/서버 클라이언트 분리
- Supabase Auth 회원가입 예시
- Middleware 기반 세션 갱신 구조
- Drizzle ORM PostgreSQL 스키마 예시
- 사용자, 게시물, 댓글, 좋아요, 팔로우 테이블 예시
- TanStack Query 기반 API 호출 예시
- Tailwind CSS 기반 기본 UI

## 프로젝트 구조

```txt
app/
  api/[[...route]]/route.ts   # Hono API 엔드포인트
  page.tsx                    # 메인 예시 화면
  signup/page.tsx             # Supabase 회원가입 예시
  tasks/page.tsx              # API 데이터 호출 예시
  profile/page.tsx            # 인증 사용자 확인 예시
drizzle/
  schema.ts                   # Drizzle DB 스키마
  index.ts                    # DB 클라이언트
lib/
  api.ts                      # Hono 타입 클라이언트
  auth-context.tsx            # 클라이언트 인증 컨텍스트
  queries.ts                  # TanStack Query 예시
  supabase/                   # Supabase client/server 헬퍼
```

## 실행 방법

### 1. 의존성 설치

```bash
bun install
```

### 2. 환경 변수 설정

루트에 `.env.local` 파일을 만들고 필요한 값을 채웁니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
OPENAI_API_KEY=
```

현재 템플릿에는 Supabase Auth, Drizzle/PostgreSQL, AI SDK 의존성이 포함되어 있습니다. 사용하지 않는 기능은 해커톤 주제에 맞게 제거해도 됩니다.

### 3. 개발 서버 실행

```bash
bun dev
```

기본 주소는 다음과 같습니다.

```txt
http://localhost:3000
```

## DB 명령어

```bash
# Drizzle migration 파일 생성
bun run db:generate

# migration 실행
bun run db:migrate

# 현재 스키마를 DB에 바로 반영
bun run db:push

# Drizzle Studio 실행
bun run db:studio
```

해커톤 중에는 빠른 검증이 필요하면 `db:push`를 사용하고, 최종 정리 단계에서는 migration 파일을 남기는 방식을 추천합니다.

## 팀 사용 방법

1. 이 저장소를 fork하거나 template으로 복사합니다.
2. 서비스 이름과 메인 화면을 팀 주제에 맞게 변경합니다.
3. `drizzle/schema.ts`에서 필요한 테이블을 정의합니다.
4. `app/api/[[...route]]/route.ts`에 필요한 API를 추가합니다.
5. `lib/queries.ts` 또는 Hono client를 통해 프론트엔드와 연결합니다.
6. 발표에 필요한 핵심 플로우부터 구현합니다.

## 해커톤 개발 우선순위

24시간 안에 모든 것을 완벽하게 만들 수는 없습니다. 이 템플릿을 사용할 때는 다음 순서를 추천합니다.

1. 핵심 사용자 흐름 1개 정하기
2. 필요한 DB 테이블 최소화하기
3. API 먼저 연결하기
4. 화면은 데모 가능한 수준으로 빠르게 만들기
5. 예외 처리와 검증은 중요한 입력부터 적용하기
6. 발표 직전에는 새 기능보다 안정화에 집중하기

## 커스터마이징 체크리스트

- [ ] 프로젝트 이름 변경
- [ ] 메인 화면 문구와 디자인 변경
- [ ] 예시 task API를 실제 도메인 API로 변경
- [ ] Drizzle schema를 팀 서비스에 맞게 수정
- [ ] Supabase 프로젝트 연결
- [ ] 환경 변수 설정
- [ ] 사용하지 않는 의존성 제거
- [ ] 배포 환경에서 빌드 확인

## 이 템플릿의 기준

이 저장소는 "모든 해커톤 문제를 해결하는 완성형 서비스"가 아닙니다.

대신 백엔드팀이 매번 반복하던 초기 작업을 줄이고, 경상국립대 14기 백엔드팀이 제한된 시간 안에 더 빠르게 제품을 만들 수 있도록 돕는 출발점입니다.

환경 구축은 템플릿이 가져가고, 24시간은 팀의 아이디어와 구현에 쓰는 것이 이 프로젝트의 목표입니다.
