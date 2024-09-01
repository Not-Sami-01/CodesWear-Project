import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MyAccount = ({ user, mySuccess, myError }) => {
  const router = useRouter()


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      setData();
    }
  }, []);



  const [input, setInput] = useState({ name: '', email: '', phone: '', showPassword: false, address: '', newPassword: '', prevPassword: '' });
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [disabled, setDisabled] = useState(true);

  const toggleShowPassword = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  }


  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });

    setTimeout(() => {
      if (input.name.length > 3 && input.phone?.length > 3 && input.address.length > 3) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100)
  }



  const isServiceAble = async (pin) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
      method: 'POST'
    })
    const data = await response.json();
    if (Object.keys(data).includes(pin)) {
      return true;
    } else {
      return false;
    }
  }


  const handleChange2 = (e) => {
    if (e.target.name === 'state') { setState(e.target.value) }
    if (e.target.name === 'city') { setCity(e.target.value) }
    if (e.target.name === 'pinCode') {
      setPinCode(e.target.value)
      if (e.target.value.length > 3) {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
          method: 'POST'
        }).then(response => response.json()).then(response => {
          if (Object.keys(response).includes(e.target.value)) {
            setCity(response[e.target.value][0]);
            setState(response[e.target.value][1]);
          } else {
            setCity('');
            setState('');
          }
        })
      }
    }
  }



  const setData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    const data = await response.json();
    const user = data.user;
    setInput({ ...input, email: user.email, name: user.name, phone: user.phoneNumber, address: user.address });
    setPinCode(user.pinCode);
    setState(user.state);
    setCity(user.city);
  }


  const handleSubmit = async (e) => {
    if (await isServiceAble(pinCode)) {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/updateuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...input, city, state, pinCode, token })
      })
      const data = await response.json();
      if (data.success) {
        mySuccess(data.message);
      } else {
        myError(data.message);
      }
    } else {
      myError('Sorry! The service is not available for this area. Please try another pin code');
    }
  }

  const changePassword = async () => {
    const data = {
      token: localStorage.getItem('token'),
      prevPassword: input.prevPassword,
      newPassword: input.newPassword
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/changepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const parsedData = await response.json();
    if (parsedData.success) {
      mySuccess(parsedData.message);
    } else {
      myError(parsedData.message);
    }
    setInput({ ...input, newPassword: '', prevPassword: '' });
  }
  return (
    <>
    <Head>
        <title>Account - Wear the code</title>
      </Head>
      <div className='container p-4 mx-auto'>
        <h1 className="text-center text-xl font-semibold ">Update Account</h1>
        <h1 className="mt-10 text-xl">1- Change Delivery details</h1>
        <div className="container">
          <div className="mx-auto flex flex-col md:flex-row">
            <div className="px-2 w-1/2">
              <div className="mb-1">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input type="text" name="name" onChange={handleChange} value={input.name} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 md:w-1/2 w-full">
              <div className="mb-1">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Email (Cannot be updated)
                </label>
                <input type="email" name="email" readOnly onChange={handleChange} value={input.email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
              </div>
            </div>
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
                <input type="text" name="state" onChange={handleChange2} value={state} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
              </div>
            </div>
            <div className="px-2 md:w-1/2 w-full">
              <div className="mb-1">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  District
                </label>
                <input type="text" onChange={handleChange2} value={city} name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} className="disabled:bg-pink-200 inline p-4 m-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none active:bg-pink-600 mx-1 rounded text-sm">Save</button>
        </div>




        <h1 className="mt-10 text-xl">2- Change Password</h1>
        <div className="flex">
          <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input type={input.showPassword ? 'text' : 'password'} name="prevPassword" onChange={handleChange} value={input.prevPassword} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 md:w-1/2 w-full">
            <div className="mb-1">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                New Password
              </label>
              <input type={input.showPassword ? 'text' : 'password'} name="newPassword" onChange={handleChange} value={input.newPassword} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <label htmlFor="">Show Password</label><input type="checkbox" onChange={toggleShowPassword} className="mx-2" />
        <button className="disabled:bg-pink-200 p-4 m-2 text-white bg-pink-500 border-0 py-2 px-2 block focus:outline-none active:bg-pink-600 mx-1 rounded text-sm" onClick={changePassword} >Save</button>

      </div>
    </>
  )
}

export default MyAccount
