import ProductDisplay from '@/components/ProductDisplay'
import Head from 'next/head'
import React from 'react'

const TShirts = ({products}) => {
  return (
    <>
    <Head>
        <title>TShirts - Wear the code</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-evenly -m-4">
            {Object.keys(products).length === 0 ? <p>Sorry! All the T-Shirts are currently out of stock</p>:
              Object.keys(products).map(product => {
                return <ProductDisplay key={products[product].slug} slug={products[product].slug} category={products[product].category} price={products[product].price} img={'https://m.media-amazon.com/images/I/71EuSpvOFQL._AC_SX385_.jpg'} name={products[product].title} colors={products[product].color} availableQuantity={products[product].availableQuantity} sizes={products[product].size} />
              })
            }
            
          </div>
        </div>
      </section>
    </>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/getproducts`)
  const parsedData = await data.json();
  // let parsedData = {success: false}
  // console.log(parsedData2);
  // Pass data to the page via props
  if(parsedData.success){
    return { props: { products: parsedData.tShirts } }
  }else{
    return { props: { products: '' } }
  }
}

export default TShirts