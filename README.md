# 멋쟁이 사자 GNU팀 해커톤 템플릿

## 빠른 시작
1. 저장소 클론: `git clone https://github.com/gyutaetae/GNU_hackathon_templete`
2. 패키지 설치: `bun install` (npm보다 10배 빠름!)
3. 개발 서버 실행: `bun dev`

## 기술 스택
- **Runtime**: Bun (초고속 엔진)
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Hono (Edge 최적화)
- **Communication**: Hono RPC (타입 자동완성 지원)

## 백엔드(API) 만들 때
app/api/[[...route]]/route.ts 파일에 아래처럼 경로만 추가해주세요.

```typescript
const routes = app
  .get('/hello', (c) => c.json({ message: 'Hello!' }))
  .post('/user', (c) => {
    return c.json({ id: 1, name: '멋사' }) 
  })
```

## 프론트엔드에서 데이터 가져올 때
fetch나 axios 대신 제가 만든 client를 쓰면 자동완성

```typescript
import { client } from '@/lib/api' // 내가 미리 만들어둔 클라이언트

const res = await client.api.user.$post() // .api 뒤에 자동으로 경로가 뜸!
const user = await res.json()

console.log(user.name) // 'user.'만 쳐도 name이 목록에 나옴!
```

## 주의점
베셀에 배포할때 install command 대신 bun install 
build command 대신 bun run build로 설정


## RPC pattern : 장점들
1.타입자동완성 + 에러자동탐지

2.name을 nickname 으로 바꾸면 에러위치를 보여줌 

3.json 구조 자동파악 res.json() 다음에 .찍으면 서버가 보내주는 데이터 다알려줘서 api명세서 안봐도 데이터 타입파악가능 

4.export type AppType = typeof routes 만으로 백앤드와 프론트엔드 연결 


백엔드 코드가 곧 프론트엔드의 가이드라인이 되어, 소통 에러를 제로(0)로 만드는 기술