import { GetStaticProps } from 'next'
import React from 'react'
import Page from '../components/Page'
import ProductCard from '../components/ProductCard'
import { getProducts, Product } from '../lib/products'

interface HomePageProps {
  products: Product[]
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[HomePage] getStaticProps()')
  const products = await getProducts()

  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  } // every 5 sec recall getStaticProps
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log('[HomePage] render:', products)

  return (
    <Page title="Indoor Plants"> 
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  )
}

export default HomePage
