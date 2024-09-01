import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'


const Product = ({ params, addToCart, buyNow, variants, item }) => {

  let router = useRouter();
  const [state, setState] = useState({ pinCode: -1 });
  const [service, setService] = useState();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  const checkPinCode = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
      method: 'POST'
    }).then(response => response.json()).then(response => {
      if (Object.keys(response).includes(state.pinCode)) {
        setService(true);
      } else {
        setService(false);
      }
    })
  }
  const [color, setColor] = useState(item?.color ? item.color : 'none');
  const [size, setSize] = useState(item?.size ? item.size : 'none');
  return item ? <>
    < section className="text-gray-600 body-font overflow-hidden" >
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src="https://m.media-amazon.com/images/I/71EuSpvOFQL._AC_SX385_.jpg" />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{item.title}</h1>

            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
             */}
            <p className="leading-relaxed">{item.des}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).map(curColor => {
                  return <Link onClick={() => { setColor(curColor) }} key={curColor} href={`/product/${variants[curColor][variants[curColor].size].slug}`} className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" style={{
                    backgroundColor: curColor
                  }}></Link>

                })}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="">
                  <div className="p-1 border border-gray-200">
                    <select name="" id="" onChange={(e) => router.push('/product/' + e.target.value)}>
                      {
                        Object.keys(variants[color]).filter(key => key !== 'size').map((key, index) => {
                          return <option key={key + index} value={variants[color][key].slug}>{key}</option>
                        })
                      }
                    </select>
                  </div>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${item.price}</span>
              {item.availableQuantity < 1 ? <button className="flex ml-4 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Out of stock</button> : <><button className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={() => { buyNow(item.slug, 1, item.price, item.title, item.size, item.color); }}>Buy now</button>
                <button className="flex ml-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={() => { addToCart(item.slug, 1, item.price, item.title, item.size, item.color); }} >Add to cart</button></>}
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="pin mt-6 flex justify-center">
        <input placeholder='Enter pin code here...' value={state.pinCode == -1 ? '' : state.pinCode} name='pinCode' onChange={handleChange} type="text" className={'border p-2'} />

        <button onClick={checkPinCode} className='mx-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded'>Check</button>
      </div>
      <div className="flex justify-center">
        {service && <p className='text-green-500 p-2 text-sm'>Congrats! This pin code is serviceable</p>}
        {service === false && <p className='text-red-500 p-2 text-sm'>Sorry! We do not deliver this pin code yet</p>}
      </div>
    </section >
  </> : <div className='text-3xl text-center my-24'>
    <p className='text-center text-xl my-6'></p>
    Error 404! Product not found
    <br />
    <br />
    <Link href={'/'} className='text-base active:bg-pink-600 bg-pink-500 p-2 text-white rounded'>Click here to return to home page</Link>
  </div>


}


export async function getServerSideProps(context) {
  // Fetch data from external API
  const data = await fetch('http://localhost:3000/api/product/getproducts')
  const parsedData = await data.json();
  // Pass data to the page via props
  if (parsedData.success) {
    let items = parsedData.products.filter(item => { return item.slug === context.params.slug });
    if (items.length !== 0) {
      let slug = context.params.slug;
      let products = parsedData.products;
      let item = products.filter(item => { return item.slug === slug });
      item.length !== 0 ? item = item[0] : null;
      let variants = {};
      if (items[0].length !== 0) {
        for (let item of products.filter(item => item.category === items[0].category && item.title === items[0].title)) {
          if (Object.keys(variants).includes(item.color)) {
            if (Object.keys(variants[item.color]).includes(item.size)) {
            } else {
              variants[item.color][item.size] = { slug: item.slug };
            }
          } else {
            variants[item.color] = { size: item.size };
            variants[item.color][item.size] = { slug: item.slug };
          }
        }
      }
      return { props: { products: parsedData.products, variants, item } }
    }
    else return ({ props: { products: false, variants: {} } });
  } else {
    return { props: { products: '' } }
  }
}
export default Product