'use client'
import { useEffect, useState } from 'react'
import { client } from '@/lib/rpc'

type Task = {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
}

export default function Home() {
  const [hello, setHello] = useState<string>('loading...')
  const [tasks, setTasks] = useState<Task[]>([]) // Task[]는 배열을 의미
  const [newTitle, setNewTitle] = useState('')

  // 1. 목록 가져오기 함수
  const refreshTasks = async () => {
    const res = await client.api.tasks.$get() // get 요청
    const data = await res.json() // 요청받은거 json으로 변환
    setTasks(data.tasks as Task[]) // 받은 데이터를 tasks에 저장
  }

  // 2. 추가하기 함수
  const addTask = async () => {
    if (!newTitle.trim()) return
    await client.api.tasks.$post({
      json: { title: newTitle, status: 'todo' }
    })
    setNewTitle('')
    refreshTasks()
  }

  // 3. 상태 변경 함수
  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'done' ? 'todo' : 'done' as any
    await client.api.tasks[':id'].$patch({
      param: { id },
      json: { status: nextStatus }
    })
    refreshTasks()
  }

  // 4. 삭제 함수
  const deleteTask = async (id: string) => {
    await client.api.tasks[':id'].$delete({
      param: { id }
    })
    refreshTasks()
  }


  useEffect(() => {
    refreshTasks()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50 text-gray-900">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">API 테스트 데모</h1>
          <p className="text-sm text-gray-500 font-medium">관리자님, 환영합니다!</p>
        </header>

        {/* 입력 섹션 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="새로운 할 일을 입력하세요"
            className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
          >
            추가
          </button>
        </div>

        {/* 목록 섹션 */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-700 px-1">할 일 목록</h2>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-8">할 일이 없습니다.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all"
              >
                <div
                  className={`flex-1 cursor-pointer select-none ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-700'}`}
                  onClick={() => toggleStatus(task.id, task.status)}
                >
                  {task.title}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center uppercase tracking-widest">
          Powered by Hono RPC + Next.js
        </footer>
      </div>
    </main>
  )
}
