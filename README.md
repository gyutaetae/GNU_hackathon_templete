# 멋쟁이 사자 GNU팀 해커톤 템플릿

## 빠른 시작
1. 저장소 클론: `git clone https://github.com/gyutaetae/GNU_hackathon_templete`
2. 패키지 설치: `bun install` (npm보다 10배 빠름!)
3. cp .env.local.example .env.local
4. .env.local 열어서 Supabase 값 채우기
5. 개발 서버 실행: `bun dev`

## 환경변수 설정 (.env.local)
Supabase 대시보드 > Settings > API 에서 복사

## Hono RPC — 백엔드 API

`app/api/[[...route]]/route.ts` 에 경로 추가:

```typescript
const routes = app
  .get('/hello', (c) => c.json({ message: 'Hello!' }))
  .post('/user', zValidator('json', schema), async (c) => {
    const body = c.req.valid('json')
    return c.json({ id: 1, name: body.name })
  })
```

프론트에서 호출 (타입 자동완성):

```typescript
import { client } from '@/lib/api'

const res = await client.api.hello.$get()
const data = await res.json()
// data.message — 자동완성 됨
```

---

## Supabase Auth

```typescript
// 클라이언트 컴포넌트
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// 회원가입
await supabase.auth.signUp({ email, password })

// 로그인
await supabase.auth.signInWithPassword({ email, password })

// 로그아웃
await supabase.auth.signOut()
```

```typescript
// 서버 컴포넌트 / Route Handler
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

---

## Drizzle ORM

스키마 수정 후 DB에 반영:

```bash
bun db:push        # 개발 중 빠르게 반영 (마이그레이션 파일 없이)
bun db:generate    # 마이그레이션 파일 생성
bun db:migrate     # 마이그레이션 실행
bun db:studio      # Drizzle Studio (DB GUI)
```

쿼리 예시:

```typescript
import { db } from '@/db'
import { users, posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

// 전체 조회
const allUsers = await db.select().from(users)

// 조건 조회
const user = await db.select().from(users).where(eq(users.id, userId))

// 삽입
await db.insert(posts).values({ title: '제목', authorId: user.id })
```

---

## Vercel 배포 꿀팁

- 베셀에 배포할때 install command 대신 bun install 빌드시간 비약적으로 단축

- build command 대신 bun run build로 설정

- 환경변수 3개 Vercel 대시보드에 동일하게 추가 필수

## PC pattern : 장점들
1.타입자동완성 + 에러자동탐지 @hono/zod-validator를 쓰면 잘못된 데이터를 보냈을 때 클라이언트가 백엔드에서 자동으로 에러를 잡아줌

2.name을 nickname 으로 바꾸면 에러위치를 보여줌

3.json 구조 자동파악 res.json() 다음에 .찍으면 서버가 보내주는 데이터 다알려줘서 api명세서 안봐도 데이터 타입파악가능

4.export type AppType = typeof routes 만으로 백앤드와 프론트엔드 연결

5.Edge Runtime 의 속도 : export const runtime = 'edge' 설정으로 반응속도가 빛의 속도임을 어필가능

백엔드 코드가 곧 프론트엔드의 가이드라인이 되어, 소통 에러를 제로(0)로 만드는 기술

## 생성과정

1. Next.js 프로젝트 생성 (Bun 사용)
bun create next-app my-hackathon-app --tailwind --typescript --eslint

2. 핵심 라이브러리 한 번에 설치
bun add hono @lucia-auth/adapter-postgresql drizzle-orm @supabase/supabase-js
bun add -d drizzle-kit @types/bun

3. UI 컴포넌트 라이브러리 초기화 (shadcn/ui)
bunx shadcn-ui@latest init

route.ts 에 hono 서버를 심음 : next.js에서 api가 돌아가게 만듦

api.ts에 client를 정의 : 백앤드 타입을 프론트에드가 실시간으로 인지하게 (RPC) 설정

## 핵심폴더
app/ : Next.js 메인폴더 page.tsx : 첫 페이지 route.ts : 백엔드 모든 api 관리 layout.tsx : 모든 페이지에 적용되는 공통 레이아웃 ( 헤더, 푸터 ) gloabls.css : tailwind css 설정 및 공통 스타일

lib/ : 전역에서 쓰이는 함수 모음(api.ts) api.ts 프론트에서 백엔드를 호출할때 쓰는 client 객체정의 public/ : 이미지, 폰트 등 정적 파일들이 들어감 node_modules/ : bun install로 생성된 라이브러리들 .next/ : 자동생성된 빌드 결과물들 bun dev, bun run build 할때마다 자동으로 갱신됨

프로젝트 폴더 AGENTS.md : ai 어이스턴트에게 주는 지침서 CLAUDE.md : 클로드에게 주는 지침서

package.json : 프로젝트 설정 파일 bun.lock : 번 패키지 잠금 파일

next.config.ts : next.js 동작 방식 제어
next-env.d.ts : next.js 타입 정의 파일 (자동으로 생성됨) postcss.config.mjs : postCSS 가 Tailwind CSS를 가공해줌

tsconfig.json : 타입스크립트 컴파일 관련 규칙 eslint.config.mjs : 코드 보안관 오타가 날법한 코드를 잡아내서 노란색/빨간색 줄을 띄워줌
