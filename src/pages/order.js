import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const Order = ({ subTotal, order }) => {
  const router = useRouter();
  function formater(dateStr, locale = 'en-US', timeZone = 'UTC') {
    const date = new Date(dateStr);

    const optionsDate = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: timeZone
    };

    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timeZone
    };

    const dateFormatter = new Intl.DateTimeFormat(locale, optionsDate);
    const timeFormatter = new Intl.DateTimeFormat(locale, optionsTime);

    const formattedDate = dateFormatter.format(date);
    const formattedTime = timeFormatter.format(date);

    return `${formattedDate} at ${formattedTime}`;
  }
  return (
    <>
      <Head>
        <title>Order - Wear the code</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        {order ? <div className="px-5 py-10 md:py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">codeswear.com</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
              <p className="leading-relaxed mb-0">Your order has been successfully placed and the payment status is: {order.paymentStatus === 'Initiated' ? 'PENDING' : order.paymentStatus}</p>
              <p className="mt-2 text-sm">Placed on {formater(order.createdAt)}</p>
              <table className='w-full px-4 lg:px-0'>
                <thead>
                  <tr className="flex w-full justify-between border-t border-gray-200 py-2">
                    <th className="text-gray-500 px-2 min-w-[150px]">Product</th>
                    <th className="text-gray-500 px-2 ">Quantity</th>
                    <th className="text-gray-500 px-2 ">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(order.products)?.map((product, index) => {
                      return <tr key={index} className="flex w-full justify-between border-t border-gray-200 py-2">
                        <td className='max-w-[200px] px-0'><a href={`/product/${product}`} target='_blank'>
                          <span className="text-gray-500 text-sm capitalize">
                            {order.products[product].name} ({order.products[product].variant}/{order.products[product].size})
                          </span>
                        </a></td>
                        <td className="text-gray-500 px-2 text-sm">{order.products[product].quantity}</td>
                        <td className="text-gray-500 px-2 text-sm">${order.products[product].price}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Amount: ${order.amount}</span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track order</button>

              </div>
            </div>
            <div className="w-screen lg:w-1/2">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108780.45714561707!2d74.22569274902345!3d31.5683710321653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ca8f5a906f1%3A0xc5dad8adc056fa92!2sLahore%20Museum!5e0!3m2!1sen!2s!4v1723691651897!5m2!1sen!2s" width="100%" height="500" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
          </div>
        </div> : <div className='text-3xl text-center my-24'>
          Bad request. Your order does not exist
          <br />
          <br />
          <Link href={'/'} className='text-base active:bg-pink-600 bg-pink-500 p-2 text-white rounded'>Click here to go to the home page</Link>
        </div>}
      </section>
    </>
  )
}

export default Order

export async function getServerSideProps(context) {
  const id = context.query.id;
  const userId = context.query.uId || context.query.uid;
  if (!id || !userId) {
    return { props: { order: false } };
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getorderbyid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, userId })
  });
  const data = await response.json();
  if (!data.success) {
    return { props: { order: false } };
  } else
    return { props: { order: data.order } };
}