import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '@/drizzle/index'
import { users } from '@/drizzle/schema'
import { createClient} from '@/lib/supabase/server'
import { appRouterContext } from 'next/dist/server/route-modules/app-route/shared-modules';

// 엣지런타입 사용 
export const runtime = 'edge'

const app = new Hono().basePath('/api')//api로 시작하는 모든 요청을 처리할거야 
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(32)
})

// 임시 데이터 (메모리 저장소)
let tasks = [
  { id: '1', title: 'Hono 공부하기', status: 'done' },
  { id: '2', title: 'Next.js API 만들기', status: 'doing' },
]

const taskSchema = z.object({
  title: z.string().min(1, "제목은 필수"),
  status: z.enum(['todo', 'doing', 'done']).default('todo')
})

const routes = app
  .get('/hello', (c) => {
    return c.json({ message: "안녕! " })
  })
  .get('/tasks', (c) => {
    return c.json({ tasks })
  })
  .post('/tasks', zValidator('json', taskSchema), async (c) => {
    const { title, status } = c.req.valid('json')
    const newNode = { id: Math.random().toString(36).substring(7), title, status }
    tasks.push(newNode as any)
    return c.json({ message: 'created!', data: newNode }, 201)
  })
  .patch(
    '/tasks/:id',
    zValidator('json', z.object({ status: z.enum(['todo', 'doing', 'done']) })),
    async (c) => {
      const id = c.req.param('id')
      const { status } = c.req.valid('json')
      tasks = tasks.map(t => t.id === id ? { ...t, status } : t)
      return c.json({ message: 'updated!' })
    }
  )
  .delete('/tasks/:id', (c) => {
    const id = c.req.param('id')
    tasks = tasks.filter(t => t.id !== id)
    return c.json({ message: 'deleted' })
  })

  //로그인register post
  .post('/register', zValidator('json', userSchema), async (c) => {
    const data = c.req.valid('json')
    return c.json({ success: true, message: 'User registered successfully'})
  })

  //인증 추가 
  .post('/protected', async (c)=> {
    const supabase =await createClient()
    const {data: {user}}=await supabase.auth.getUser()

    if (!user) return c.json({erroe: '인증 필요'}, 401)
    return c.json({ user })
  })

  //에러 처리 
  .post('/create', zValidator('json', taskSchema), async (c) => {
    try {
      const data = c.req.valid('json')
      // DB에 저장하는 로직 여기 추가
      return c.json({ success: true, data }, 201)
    } catch (error: any) {
      return c.json({ error: error.message || 'Server error' }, 500)
    }
  })

  
// 타입 공유를 위해 export
export type AppType = typeof routes

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

