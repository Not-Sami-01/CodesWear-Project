import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Login = ({mySuccess, myError, setKey, user}) => {
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/');
    }
  },[])
  
  const [change, setChange] = useState({email:'', password: '', showPassword: false});
  const handleChange = (e) => {
    setChange({...change, [e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChange({email:'', password: ''});
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: change.email, password: change.password})
    });
      const data = await response.json();
      if(data.success){
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('userId', data.userId);
        mySuccess('You have been logged in successfully!');
        setKey(Math.random());
        router.push('/');
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
        <title>Login - Wear the code</title>
      </Head>
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="/logo.png" alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className='!mt-2'>
          <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" value={change.email} onChange={handleChange} type="email" autoComplete="email"  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 focus:outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div className='!mt-2'>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input id="password" name="password" value={change.password} onChange={handleChange} type={change.showPassword? 'text': 'password'} autoComplete="current-password"  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
            Show password <input type="checkbox" onChange={toggleShowPassword} className="" />
          </div>
        </div>
        <div className="text-sm">
              <Link href="/forgot" className="font-semibold text-pink-600 hover:text-pink-500">Forgot password?</Link>
            </div>  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Login</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <Link href="/signup" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">Click here to Signup</Link>
      </p>
    </div>
  </div>
    </>
    )
}

export default Login