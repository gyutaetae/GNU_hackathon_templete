import { Hono } from 'hono'
import { handle } from 'hono/vercel'

// 이 부분이 핵심! 나중에 프론트에서 이 타입을 그대로 수입해서 씁니다.
export const runtime = 'edge'

const app = new Hono().basePath('/api')

// 샘플 API
const routes = app
  .get('/hello', (c) => {
    return c.json({
      message: 'Hello from Hono!',
      speed: 'Ultra Fast ⚡️'
    })
  })
  .post('/user', (c) => {
    return c.json({ id: 1, name: '멋사' })
  })

// 타입 공유를 위해 export
export type AppType = typeof routes

export const GET = handle(app)
export const POST = handle(app)
