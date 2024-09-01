import ProductDisplay from '@/components/ProductDisplay'
import Head from 'next/head'
import React from 'react'

const Hoodies = ({products}) => {
  

  return (
    <div>
      <Head>
        <title>Hoodies - Wear the code</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-evenly -m-4">
            {Object.keys(products).length === 0 ? <p>Sorry! All the hoodies are currently out of stock</p>: 
            
              Object.keys(products).map(product => {
                return <ProductDisplay key={products[product].slug} slug={products[product].slug} category={products[product].category} price={products[product].price} img={'https://m.media-amazon.com/images/I/9112xNSIlqL._AC_SX522_.jpg'} name={products[product].title} colors={products[product].color} sizes={products[product].size} />
              })
            
          }
          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/getproducts`)
  const parsedData = await data.json();
  // Pass data to the page via props
  if(parsedData.success){
    return { props: { products: parsedData.hoodies } }
  }else{
    return { props: { products: '' } }
  }
}

export default Hoodies