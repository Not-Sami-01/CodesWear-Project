import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Orders = ({ repo }) => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    } else {
      setUserId(localStorage.getItem('userId'));
      const email = localStorage.getItem('email');
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getallorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      }).then(response => response.json()).then(response => setOrders(response.orders));
    }
  }, []);
  // const userId = localStorage.getItem('userId');
  return (
    <>
    <Head>
        <title>Orders - Wear the code</title>
      </Head>
      <div className='container my-10 '>
        <div className="rounded-t-xl overflow-hidden mx-auto w-max p-10">
          {orders.length!== 0? <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-pink-600">#</th>
                <th className="px-4 py-2 text-pink-600">Order Id</th>
                <th className="px-4 py-2 text-pink-600">Email</th>
                <th className="px-4 py-2 text-pink-600">Amount</th>
                {/* <th className="px-4 py-2 text-pink-600">Payment Status</th> */}
                <th className="px-4 py-2 text-pink-600">Order date</th>
                <th className="px-4 py-2 text-pink-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((key, index)=> {
                return <tr key={index} className='hover:bg-pink-200'>
                <td className="border border-pink-500 px-4 py-2 text-pink-600 font-medium ">{index+1}.</td>
                <td className="border border-pink-500 px-4 py-2 text-pink-600 font-medium ">#{key.orderId}</td>
                <td className="border border-pink-500 px-4 py-2 text-pink-600 font-medium ">{key.email}</td>
                <td className="border border-pink-500 px-4 py-2 text-pink-600 font-medium ">${key.amount}</td>
                <td className="border border-pink-500 px-4 py-2 text-pink-600 font-medium ">{new Date(key.updatedAt).toGMTString()}</td>
                <td className="border border-pink-500 px-4 py-2 active:bg-pink-400 hover:bg-pink-300 text-pink-600 font-medium "><Link href={'/order?id='+key.orderId+'&uid='+userId}>See details</Link></td>
              </tr>
              }) }
            
            </tbody>
          </table> : <p className='text-xl'>Your order list is empty! Make your first order now </p> }
        </div>

      </div>
    </>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}
export default Orders