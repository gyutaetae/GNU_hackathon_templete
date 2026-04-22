// app/signup/page.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('이메일 형식이 잘못됨'),
  password: z.string().min(8, '8자 이상'),
  confirmPassword: z.string()
}).refine((d) => d.password === d.confirmPassword, {
  message: '비밀번호가 일치하지 않음',
  path: ['confirmPassword']
})

type SignUpForm = z.infer<typeof schema>

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(schema)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      })
      if (error) throw error
      alert('회원가입 성공! 이메일을 확인하세요.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="이메일"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="비밀번호 확인"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">
        {loading ? '가입 중...' : '가입'}
      </button>
    </form>
  )
}