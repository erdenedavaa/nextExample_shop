// Option 2a: fetch products on the client side (in useEffect)
// direcly from an external API

import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { getProducts, Product } from '../lib/products'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    getProducts().then(setProducts) // then((products) => setProducts(products))
  }, [])

  console.log('[HomePage] render:', products)

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className='px-6 py-3'>
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default HomePage
