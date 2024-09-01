import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Forgot = ({ user, mySuccess, myError }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [change, setChange] = useState({email: '', newPassword: '', confirmPassword: ''});
  

  const handleChange = (e) => {
    setChange({...change, [e.target.name]: e.target.value })
  } 


  const sendEmail = async (e) => {
    e.preventDefault();
    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/forgotpassword`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: change.email})
    });
    const parsedData = await data.json();
    if(parsedData.success){
      mySuccess(parsedData.message);
    } else{
      myError(parsedData.message);
    }
  }
  

  const resetPassword = async (e) => {
    e.preventDefault();
    if(change.newPassword === change.confirmPassword){
      const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/resetpassword`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token, newPassword: change.newPassword})
      });
      const parsedData = await data.json();
      if(parsedData.success){
        mySuccess(parsedData.message);
        router.push('/login');
      } else{
        myError(parsedData.message);
      }
    }else{
      myError('Passwords feilds do not match');
    }
    
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router.query])
  const token = router.query.token;
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <Head>
        <title>Reset Password - Wear the code</title>
      </Head>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/logo.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Find your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {token ? <form className="" onSubmit={resetPassword}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">New password</label>
              <div className="mt-2">
                <input onChange={handleChange} value={change.newPassword} name="newPassword" type={showPassword? 'text': 'password'} autoComplete="off" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div className='mt-2'>
              <label className="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
              <div className="">
                <input onChange={handleChange} value={change.confirmPassword} name="confirmPassword" type={showPassword? 'text': 'password'} autoComplete="off" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                <label htmlFor="" className='mx-2'>Show password</label>
                <input type="checkbox" className='mb-2' onChange={togglePassword} />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              <Link href="/login" className="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Click here to Login</Link>
            </p>
          </form>
            :
            <form className="" onSubmit={sendEmail}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input onChange={handleChange} value={change.email} name="email" type="email" autoComplete="email" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                <Link href="/login" className="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Click here to Login</Link>
              </p>
            </form>}


        </div>
      </div>
    </>
  )
}

export default Forgot