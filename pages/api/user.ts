// cookie is only read from http, can't read by frontEnd. So read authenticated urer information (jwt) from this WAY
import { NextApiHandler } from 'next'
import { fetchJson } from '../../lib/api'
import { User } from '../../lib/user'
const { CMS_URL } = process.env

const handleUser: NextApiHandler<User> = async (req, res) => {
  // console.log('cookies:', req.cookies);
  const { jwt } = req.cookies
  if (!jwt) {
    res.status(401).end()
    return
  }
  try {
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    res.status(200).json({
      id: user.id,
      name: user.username,
    })
  } catch (err) {
    res.status(401).end()
  }
}

export default handleUser
