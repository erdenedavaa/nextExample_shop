import Head from 'next/head'
import React from 'react'
import Title from './Title'
import NavBar from './NavBar'

interface PageProps {
  title: string
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div className='container mx-auto'>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='px-6 py-3'>
        <Title>{title}</Title>
        {children}
      </main>
    </div>
  )
}

export default Page
