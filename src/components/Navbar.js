import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { FaCartShopping, FaCircleMinus, FaCirclePlus, FaBagShopping } from "react-icons/fa6";
import { RiAccountCircleLine } from "react-icons/ri";
import User from '@/Models/User';
import $ from 'jquery'

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, saveCart, subTotal, user, logout }) => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false)
  const toggleCart = () => {
    setDropdown(false);
    if (ref.current.classList.contains('-right-96')) {
      ref.current.classList.remove('-right-96')
      ref.current.classList.add('right-0')
    } else if (ref.current.classList.contains('right-0')) {
      ref.current.classList.remove('right-0')
      ref.current.classList.add('-right-96')
    }
  }
  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }
  return (
    <div className=' flex justify-between md:flex-row flex-col shadow sticky top-0 z-10 bg-white'>
      <img className='clear-both float-left' src="/logo.png" alt="" width={180} />
      <ul className='flex justify-center font-semibold'>
        <Link href={'/'}><li className='mx-1 text-sm md:text-base uppercase border border-transparent py-2 '>Home</li></Link>
        <Link href={'/tshirts'}><li className='mx-1 md:mx-3 text-sm md:text-base uppercase border border-transparent py-2 '>Tshirts</li></Link>
        <Link href={'/hoodies'}><li className='mx-1 md:mx-3 text-sm md:text-base uppercase border border-transparent py-2 '>Hoodies</li></Link>
        <Link href={'/stickers'}><li className='mx-1 md:mx-3 text-sm md:text-base uppercase border border-transparent py-2 '>Stickers</li></Link>
        <Link href={'/mugs'}><li className='mx-1 md:mx-3 text-sm md:text-base uppercase border border-transparent py-2 '>Mugs</li></Link>
      </ul>
      <div className="flex items-center cart text-center font-bold md:relative absolute right-1 text-2xl top-1 py-2 bold mx-2 ">
        {user.value !== null ?
          <>
            <RiAccountCircleLine className='cursor-pointer mx-2' onClick={toggleDropdown}  />
          </> : <Link href={'/login'} className='px-3 bg-pink-500 text-white active:bg-pink-600 py-1 rounded mx-2 text-sm font-normal'>Login</Link>
        }
        <FaCartShopping onClick={toggleCart} className='cursor-pointer' />
            {dropdown && <div className="dropdown absolute top-9 rounded text-white right-8 z-50 font-normal text-base w-24 bg-pink-500">
              <ul className='w-full cursor-pointer'>
                <li className='py-1 rounded text-start px-3 select-none hover:bg-pink-600'><Link href={'/myaccount'}>Account</Link></li>
                <li className='py-1 rounded text-start px-3 select-none hover:bg-pink-600'><Link href={'/orders'}>Orders</Link></li>
                <li className='py-1 rounded text-start px-3 select-none hover:bg-pink-600' onClick={logout}>Logout</li>
              </ul>
            </div>}
      </div>
      <div ref={ref} className="sidebar overflow-y-auto shadow h-[102vh] w-72 fixed p-4 -right-96 top-0 bg-pink-100 transform transition-all z-20">
        <span className='text-3xl top-3 right-4 absolute hover:text-red-400 transition cursor-pointer' onClick={toggleCart}><IoIosCloseCircle /></span>
        <h2 className='font-semibold text-xl'>Shopping cart</h2>
        <ol className='list-decimal mx-2'>
          {Object.keys(cart).length === 0 && <div className='text-center my-4'>Your cart is empty</div>}
          {Object.keys(cart).map((cartItem, index) => {
            return (
              <li key={`${cart[cartItem].name}${index}`}>
                <div className="flex">
                  <div className='w-2/3 capitalize'>{`${cart[cartItem].name} (${cart[cartItem].variant}/${cart[cartItem].size})`}</div>
                  <div className='w-1/3 flex items-center justify-center'>
                    <button><FaCircleMinus onClick={() => { removeFromCart(cartItem, 1, cart[cartItem].price, cart[cartItem].name, cart[cartItem].size, cart[cartItem].variant) }} className='text-red-600 my-2 cursor-pointer hover:text-red-700 text-2xl block' /></button>
                    <span className="mx-2 select-none">{cart[cartItem].quantity}</span>
                    <button><FaCirclePlus onClick={() => { addToCart(cartItem, 1, cart[cartItem].price, cart[cartItem].name, cart[cartItem].size, cart[cartItem].variant) }} className='text-green-700 my-2 cursor-pointer hover:text-green-800 text-2xl block' /></button>

                  </div>
                </div>
              </li>
            )
          })}

        </ol>
        <div className="mt-16">
          Subtotal: ${subTotal}
        </div>
        <div className="flex justify-center">
          <button className="mt-2 mx-1 inline text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><Link href={'/checkout'} > <FaBagShopping className="inline" /> Checkout </Link> </button>
          <button className="inline mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 mx-1 rounded text-sm" onClick={clearCart}> Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar