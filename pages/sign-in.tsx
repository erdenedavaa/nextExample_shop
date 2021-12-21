import React, { FormEventHandler, useState } from 'react'
import Button from '../components/Button'
import Field from '../components/Field'
import Input from '../components/Input'
import Page from '../components/Page'
import { fetchJson } from '../lib/api'

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // loading, error iig negtgej bolno
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ loading: false, error: false })

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms))
  // }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: false }) // as soon as reSubmit form, then error false
    // await sleep(2000)
    try {
      // console.log('should submit:', { email, password })
      const response = await fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // body: JSON.stringify({ identifier: email, password }),
      })
      setStatus({ loading: false, error: false }) // as soon as reSubmit form, then error false
      console.log('sign in:', response)
    } catch (err) {
      // TODO:
      setStatus({ loading: false, error: true })
    }
  }

  return (
    <Page title='Sign In'>
      <form onSubmit={handleSubmit}>
        <Field label='Email'>
          <Input
            type='email'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label='Password'>
          <Input
            type='password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {status.error && <p className='text-red-500'>Invalid credentials</p>}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type='submit'>Sign In</Button>
        )}
      </form>
    </Page>
  )
}

export default SignInPage
