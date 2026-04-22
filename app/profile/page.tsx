'use client'
import { useAuth } from '@/lib/auth-context'

export default function Profile() {
  const { user, loading } = useAuth()

  if (loading) return <p>로딩 중...</p>
  if (!user) return <p>로그인 필요</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">프로필</h1>
      <p className="mt-4">환영합니다, {user.email}!</p>
    </div>
  )
}