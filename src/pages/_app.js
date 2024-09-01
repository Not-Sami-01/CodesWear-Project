import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    authUser();
    router.events.on('routeChangeStart', (event) => {
      setProgress(40);
    });
    router.events.on('routeChangeComplete', (event) => {
      setProgress(100);
    });
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        let myCart = JSON.parse(localStorage.getItem('cart'));
        let keys = Object.keys(myCart);
        let subt = 0;
        for (let i = 0; i < keys.length; i++) {
          subt += myCart[keys[i]].quantity * myCart[keys[i]].price;
        }
        setSubTotal(subt);
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem('cart');
    }
  }, [router.query])

  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const verify = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/verifyjwt`, {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
      const data = await verify.json();
      if (data.success && data.auth.email == localStorage.getItem('email')) {
        return true;
      } else {
        return false;
      }
    } else {
      return -1;
    }
  }
  const authUser = async () => {
    const login = await checkLogin();
    // console.log(login)
    if (login === false) {
      setProgress(30);
      localStorage.removeItem('token');
      setUser({ value: null });
      setKey(Math.random());
      router.push('/');
      setProgress(100);
      myError('Login session is expired. Please login again to our website')
      return false;
    } else if (login === -1) {
      return false;
    } else {
      null;
      return true;
    }
  }

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].quantity * myCart[keys[i]].price;
    }
    setSubTotal(subt);
  }


  const addToCart = (itemCode, quantity, price, name, size, variant) => {
    let myCart = cart;
    if (Object.keys(myCart).includes(itemCode)) {
      myCart[itemCode] = { quantity: myCart[itemCode].quantity + quantity, price: price, name: name, size: size, variant: variant };
    } else {
      mySuccess('Added to cart successfully!');
      myCart[itemCode] = { quantity: quantity, price: price, name: name, size: size, variant: variant };
    }
    saveCart(myCart);
    setCart(myCart);
  }


  const clearCart = (a = null) => {
    setCart({});
    localStorage.removeItem('cart');
    // localStorage.clear();
    a == null ? mySuccess('Your cart is cleared!') : null;

  }


  const removeFromCart = (itemCode, quantity, price, name, size, variant) => {
    const myCart = cart;
    if (Object.keys(myCart).includes(itemCode)) {
      myCart[itemCode].quantity -= quantity;
      if (myCart[itemCode].quantity < 1) {
        delete myCart[itemCode];
      }
      setCart(myCart);
      saveCart(myCart);
    }
  }
  const logout = () => {
    setProgress(30);
    localStorage.removeItem('token');
    setUser({ value: null });
    setKey(Math.random());
    mySuccess('Logged out successfully')
    router.push('/');
    setProgress(100);
  }
  const buyNow = (itemCode, quantity, price, name, size, variant) => {
    setCart({});
    localStorage.removeItem('cart');
    router.push('/checkout')
    let myCart = {};
    if (Object.keys(myCart).includes(itemCode)) {
      myCart[itemCode] = { quantity: myCart[itemCode].quantity + quantity, price: price, name: name, size: size, variant: variant };
    } else {
      myCart[itemCode] = { quantity: quantity, price: price, name: name, size: size, variant: variant };
    }
    saveCart(myCart);
    setCart(myCart);
  }

  const myError = msg => toast.error(msg, {
    position: "bottom-right",
    theme: 'dark',
    autoClose: 3000
  });
  const mySuccess = msg => toast.success(msg, {
    position: 'bottom-right',
    theme: 'dark',
    autoClose: 3000
  });
  return (
    <>
      <LoadingBar
        color='#f11946'
        waitingTime={1000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {key ? <Navbar key={`navbarkey_${key}`} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} saveCart={saveCart} subTotal={subTotal} mySuccess={mySuccess} myError={myError} logout={logout} authUser={authUser} /> : setKey(Math.random())}
      <ToastContainer />
          <Component {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} saveCart={saveCart} buyNow={buyNow} subTotal={subTotal} mySuccess={mySuccess} myError={myError} setKey={setKey} user={user} authUser={authUser} checkLogin={checkLogin} />
      <Footer />
    </>
  );
}
