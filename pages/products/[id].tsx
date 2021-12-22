import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { getProduct, getProducts, Product } from '../../lib/products'
import { ApiError } from '../../lib/api'
import Image from 'next/image'
import Page from '../../components/Page'
// import { useUser } from '../../hooks/user'

interface ProductPageParams extends ParsedUrlQuery {
  id: string
}

interface ProductPageProps {
  product: Product
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })), // paths: []
    fallback: 'blocking', // response is blocked until new page is generated to user
  }
}

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }) => {
  try {
    const product = await getProduct(id)
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    }
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true }
    }
    throw err
  }
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  // const user = useUser()
  console.log('[ProductPage] render:', product)
  return (
    <Page title={product.title}>
      <div className='flex flex-col md:flex-row md:space-x-5'>
        <div className=''>
          <Image src={product.pictureUrl} alt='' width={640} height={480} />
        </div>
        <div className='flex-1'>
          <p className='text-sm'>{product.description}</p>
          <p className='text-lg font-bold mt-8'>{product.price}</p>
          {/* <p>Only for {user.name}!!!</p> */}
          
        </div>
      </div>
    </Page>
  )
}

export default ProductPage
