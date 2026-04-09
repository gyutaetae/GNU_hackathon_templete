'use client'
import { useEffect, useState } from 'react'
import { client } from '@/lib/rpc'

export default function Home() {
  const [data, setData] = useState<string>('로딩 중...')

  useEffect(() => {
    const fetchData = async () => {
      // 여기서 중요! client.api.hello.$get() 이라고 치면 자동완성이 쫙 뜹니다.
      const res = await client.api.hello.$get()
      const json = (await res.json()) as { message: string }
      setData(json.message)
    }
    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-blue-600">{data}</h1>
      <p className="mt-4">이 데이터는 Bun + Hono 서버에서 광속으로 가져왔습니다.</p>
    </main>
  )
}
