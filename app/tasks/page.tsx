'use client'
import { useTasks } from '@/lib/queries'

export default function TaskList() {
  const { data, isLoading, error } = useTasks()

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>오류: {error.message}</p>
  if (!data?.tasks) return <p>데이터 없음</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">할 일 목록</h1>
      <div className="space-y-2">
        {data.tasks.map((task: any) => (
          <div key={task.id} className="p-4 border rounded">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  )
}