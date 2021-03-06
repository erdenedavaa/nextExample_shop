import Link from 'next/link'
import React from 'react'
import { useSignOut, useUser } from '../hooks/user'

const NavBar: React.FC = () => {
  const user = useUser()
  const signOut = useSignOut()

  // const handleSignOut = async () => {
  //   signOut()
  // }

  console.log('[NavBar user]: ', user)

  return (
    <nav className='px-2 py-8 text-sm'>
      <ul className='flex gap-2'>
        <li className='text-lg font-extrabold'>
          <Link href='/'>
            <a>Next Shop</a>
          </Link>
        </li>
        <li role='separator' className='flex-1' />
        {user ? (
          <>
            <li>
              <Link href='/cart'>
                <a>Cart</a>
              </Link>
            </li>
            <li>{user.name}</li>
            <li onClick={signOut}>
              <button>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href='/sign-in'>
              <a>Sign In</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
