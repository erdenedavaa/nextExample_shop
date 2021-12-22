import cookie from 'cookie'
import { NextApiHandler } from 'next'
import { fetchJson } from '../../lib/api'
import { User } from '../../lib/user'

const { CMS_URL } = process.env

const handleLogin: NextApiHandler<User> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() // method not allowed
    return
  }
  // console.log('req.body:', req.body)
  const { email, password } = req.body

  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    })
    // console.log('CMS response:', response)
    // TODO: set jwt cookie

    res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', jwt, {
          path: '/api', // only api path-d can read cookie
          httpOnly: true, // hide it from any clent side JS
          // expire time taviagui tul only use close browser
        })
      )
      .json({
        id: user.id,
        name: user.username,
      })
  } catch (err) {
    res.status(401).end()
  }
}

export default handleLogin
