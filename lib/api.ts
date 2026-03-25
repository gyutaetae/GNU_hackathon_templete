import { hc } from 'hono/client'
import { AppType } from '@/app/api/[[...route]]/route'

// 프론트엔드에서 서버 데이터를 부를 때 쓰는 클라이언트
export const client = hc<AppType>('/')
