import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCartShopping, FaCircleMinus, FaCirclePlus, FaBagShopping } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";


const Checkout = ({ subTotal, cart, addToCart, removeFromCart, clearCart, mySuccess, myError, checkLogin }) => {
  const [input, setInput] = useState({ name: '', email: '', phone: '', address: '' });
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    
    setTimeout(() => {
      if (input.name.length > 3 && input.phone.length > 3 && input.address.length > 3) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100)
  }
  useEffect(() => {
    (async()=> {
      let check = await checkLogin();
      if(check === false || check === -1){
        router.push('/login');
      }else{
        setData();
      }

    })()
  }, []);

  const setData =async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token})
    })
    const data = await response.json();
    const user = data.user;
    console.log(user);
    setInput({...input,email: user.email, name: user.name, phone: user.phoneNumber, address: user.address });
    setPinCode(user.pinCode);
    setState(user.state);
    setCity(user.city);
    if(cart.length !== 0){
      setDisabled(false);
    }
  }

  const isServiceAble = async (pin) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
      method: 'POST'
    })
    const data = await response.json();
    if (Object.keys(data).includes(pin)) {
      return true;
    }else{
      return false;
    }
  }
  const submitOrder = async () => {
    const orderId = Math.floor(Math.random() * Date.now());
    if(await isServiceAble(pinCode)){
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/ordertransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({...input,city, state, cart, orderId, subTotal, email: localStorage.getItem('email'), pinCode})
      });
      const data = await response.json();
      if(data.success){
        mySuccess(data.message);
        clearCart(3);
        router.push('/order?id='+data.orderId+'&uId='+localStorage.getItem('userId'));
      }else{
        myError(data.message);
      }
    }else{
      myError('Sorry! The service is not available for this area');
    }
  }
  const handleChange2 = (e) => {
    if(e.target.name === 'state'){setState(e.target.value)}
    if(e.target.name === 'city'){setCity(e.target.value)}
    if(e.target.name === 'pinCode'){
      setPinCode(e.target.value)
      if(e.target.value.length > 3){
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
          method: 'POST'
        }).then(response => response.json()).then(response => {
          if (Object.keys(response).includes(e.target.value)) {
            setCity(response[e.target.value][0]);
            setState(response[e.target.value][1]);
          }else{
            setCity('');
            setState('');
          }
        })
      }
    }
  }
  
  return (
    <>
    <Head>
        <title>Checkout - Wear the code</title>
      </Head>
      <div className="container mx-auto">
        <h1 className="text-center font-semibold text-3xl">Checkout</h1>
        <h2 className="text-xl font-semibold">Delivery Details</h2>
        <div className="mx-auto flex flex-col md:flex-row">
          <div className="px-2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input type="text" name="name" onChange={handleChange} value={input.name} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out"
              />
            </div>
          </div>
          {/* <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input type="email" name="email" onChange={handleChange} value={input.email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div> */}
        </div>
        <div className="flex">
          <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Phone
              </label>
              <input type="number" name="phone" onChange={handleChange} value={input.phone} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Pin Code
              </label>
              <input type="text" name="pinCode" onChange={handleChange2} value={pinCode} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea name="address" onChange={handleChange} value={input.address} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" ></textarea>
          </div>
        </div>
        <div className="flex">
          <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                State
              </label>
              <input type="text" name="state" onChange={handleChange2} readOnly value={state} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div>

          <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                District
              </label>
              <input type="text" onChange={handleChange2} readOnly value={city} name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold">Review Cart Items</h2>
        <div className="my-4">
          <h2 className='font-semibold text-base px-4 md:px-20'>Shopping cart</h2>
          <ol className='list-decimal md:w-1/2 mx-2 px-6 md:px-24'>
            {Object.keys(cart).length === 0 && <div className='text-center my-4'>Your cart is empty</div>}
            {Object.keys(cart).map((cartItem, index) => {
              return (
                <li key={`CartItem${index}`}>
                  <div className="flex ">
                    <a href={`/product/${cartItem}`} target="_blank"><div className='w-2/3 capitalize'>{cart[cartItem].name} ({cart[cartItem].variant}/{cart[cartItem].size})</div></a>
                    <div className='w-1/3 flex items-center justify-center mx-2'>
                      <button><FaCircleMinus onClick={() => { removeFromCart(cartItem, 1, cart[cartItem].price, cart[cartItem].name, cart[cartItem].size, cart[cartItem].variant) }} className='text-red-600 my-2 cursor-pointer hover:text-red-700 text-2xl block' /></button>
                      <span className="mx-2 select-none">{cart[cartItem].quantity}</span>
                      <button><FaCirclePlus onClick={() => { addToCart(cartItem, 1, cart[cartItem].price, cart[cartItem].name, cart[cartItem].size, cart[cartItem].variant) }} className='text-green-700 my-2 cursor-pointer hover:text-green-800 text-2xl block' /></button>

                    </div>
                  </div>
                </li>
              )
            })}

          </ol>
          <span className="font-semibold px-4 md:px-20">Subtotal: ${subTotal}</span>
          <div className="flex justify-start mx-6">
            <button className="inline mt-16 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 mx-1 rounded text-sm" onClick={clearCart}>Clear Cart </button>
            <button className="disabled:bg-pink-200 inline mt-16 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 mx-1 rounded text-sm" disabled={disabled || Object.keys(cart).length === 0} onClick={submitOrder} >Pay ${subTotal} </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

fetch('http://localhost:3000/api/hello', {method: "GET"}).then(response => response.json()).then(response => {console.log(response)})