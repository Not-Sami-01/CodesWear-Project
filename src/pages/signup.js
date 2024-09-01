import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Signup = ({mySuccess, myError, user}) => {
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/');
    }
  },[])
  const [change, setChange] = useState({name: '', email:'', password: '', confirmPassword: '', showPassword: false, loading: false});
  const handleChange = (e) => {
    setChange({...change, [e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChange({loading: true});
    setChange({name: '', email:'', password: '', confirmPassword: ''});
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: change.name, email: change.email, password: change.password, confirmPassword:change.confirmPassword})
    });
      const data = await response.json();
      if(data.success){
        mySuccess('Your account has been created successfully!')
      }else{
        myError(data.message);
      }
    
  }
  const toggleShowPassword = () => {
    setChange({showPassword: !change.showPassword})
  }
  return (
    <>
    <Head>
        <title>Signup - Wear the code</title>
      </Head>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/logo.png" alt="Your Company"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
        </div>
  
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div className='!mt-3'>
              <label htmlFor="h-max email" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
              <div className="">
                <input value={change.name} onChange={handleChange} id="name" name="name" type="name" autoComplete='name'  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
            <div className='!mt-3'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="">
                <input value={change.email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email"  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
  
            <div className='!mt-3'>
              <div className="h-max flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="">
                <input id="password" value={change.password} onChange={handleChange} name="password" type={change.showPassword? 'text': 'password'} autoComplete="off"  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div className='!mt-3'>
              <div className="h-max flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              </div>
              <div className="">
                <input value={change.confirmPassword} onChange={handleChange} name="confirmPassword" type={change.showPassword? 'text': 'password'} autoComplete="off"  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                Show password<input type="checkbox" onChange={toggleShowPassword} className="" />
              </div>
            </div>
            <div>
              <button disabled={change.loading} type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign in</button>
            </div>
          </form>
  
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link href="/login" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">Click here to Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup