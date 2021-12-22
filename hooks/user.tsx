import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchJson } from '../lib/api'
import { User } from '../lib/user'

const USER_QUERY_KEY = 'user'

interface SignInVariables {
  email: string
  password: string
}

interface UseSignInResult {
  signIn: (email: string, password: string) => Promise<boolean>
  signInError: boolean
  signInLoading: boolean
}

export function useSignIn(): UseSignInResult {
  const queryClient = useQueryClient()

  const mutation = useMutation<User, Error, SignInVariables>(
    ({ email, password }) =>
      fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
  )
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password })
        queryClient.setQueryData(USER_QUERY_KEY, user) // 'user' ni "user"-ees irj bga cache name
        return true
      } catch (err) {
        return false
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  }
}

export function useSignOut() {
  const queryClient = useQueryClient()

  const mutation = useMutation(() => fetchJson('/api/logout'))
  return async () => {
    await mutation.mutateAsync()
    queryClient.setQueryData(USER_QUERY_KEY, undefined)
  }
}

export const useUser = () => {
  // user is whatever name you like, but this is cache name tul oilgomjtoi bolgoh yydnees 'user' gej songon avlaa
  const query = useQuery<User>(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson('/api/user')
      } catch (err) {
        return undefined // this is assign to 'user' cache data
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, //ms
    }
  )
  return query.data
}
