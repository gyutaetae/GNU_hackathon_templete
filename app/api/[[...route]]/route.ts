import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

type TaskStatus = 'todo' | 'doing' | 'done'

let tasks: Array<{ id: string; title: string; status: TaskStatus }> = [
  { id: '1', title: '영수증 업로드 데모 준비', status: 'done' },
  { id: '2', title: 'AI 추출 결과 검수 흐름 정리', status: 'doing' },
]

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(32),
})

const taskSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  status: z.enum(['todo', 'doing', 'done']).default('todo'),
})

const app = new Hono().basePath('/api')

const routes = app
  .get('/hello', (c) => c.json({ message: 'Daon API is ready.' }))
  .get('/tasks', (c) => c.json({ tasks }))
  .post('/tasks', zValidator('json', taskSchema), async (c) => {
    const { title, status } = c.req.valid('json')
    const newTask = {
      id: Math.random().toString(36).slice(2, 9),
      title,
      status,
    }

    tasks.push(newTask)
    return c.json({ message: 'created', data: newTask }, 201)
  })
  .patch(
    '/tasks/:id',
    zValidator('json', z.object({ status: z.enum(['todo', 'doing', 'done']) })),
    async (c) => {
      const id = c.req.param('id')
      const { status } = c.req.valid('json')
      tasks = tasks.map((task) => (task.id === id ? { ...task, status } : task))
      return c.json({ message: 'updated' })
    }
  )
  .delete('/tasks/:id', (c) => {
    const id = c.req.param('id')
    tasks = tasks.filter((task) => task.id !== id)
    return c.json({ message: 'deleted' })
  })
  .post('/register', zValidator('json', userSchema), async (c) => {
    return c.json({ success: true, message: 'User registered successfully' })
  })
  .post('/protected', async (c) => {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return c.json({ error: 'Authentication required' }, 401)
    return c.json({ user })
  })
  .post('/create', zValidator('json', taskSchema), async (c) => {
    const data = c.req.valid('json')
    return c.json({ success: true, data }, 201)
  })

export type AppType = typeof routes

export const GET = handle(routes)
export const POST = handle(routes)
export const PATCH = handle(routes)
export const DELETE = handle(routes)
