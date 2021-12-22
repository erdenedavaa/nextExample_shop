import cookie from 'cookie'
import { NextApiHandler } from 'next'

const handleLogout: NextApiHandler = (req, res) => {
  res
    .status(200)
    .setHeader(
      'Set-Cookie',
      cookie.serialize('jwt', '', {
        path: '/api', // only api path-d can read cookie
        expires: new Date(0), // ungursund expires last time "cookie is already expired"
      })
    )
    .json({})
}

export default handleLogout
