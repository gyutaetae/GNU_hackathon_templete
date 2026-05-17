'use client'

import { useTasks } from '@/lib/queries'

type Task = {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
}

type TasksResponse = {
  tasks: Task[]
}

export default function TaskList() {
  const { data, isLoading, error } = useTasks<TasksResponse>()

  if (isLoading) return <p className="p-8">로딩 중...</p>
  if (error) return <p className="p-8 text-red-500">오류: {error.message}</p>
  if (!data?.tasks) return <p className="p-8">데이터가 없습니다.</p>

  return (
    <main className="min-h-screen bg-[#f7f7f2] p-8 text-[#171717]">
      <div className="mx-auto max-w-2xl rounded-xl border border-[#ded9c9] bg-white p-6">
        <h1 className="mb-4 text-2xl font-black">데모 준비 목록</h1>
        <div className="space-y-2">
          {data.tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-lg border p-4">
              <span>{task.title}</span>
              <span className="text-sm font-semibold text-[#6f6b60]">{task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
