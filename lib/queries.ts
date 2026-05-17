// lib/queries.ts
import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/rpc'

export const useTasks = <TData = unknown>() => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await client.api.tasks.$get()
      return res.json() as Promise<TData>
    }
  })
}
