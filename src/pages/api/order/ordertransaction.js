import connectDB from "@/middleware/connection"
import Order from "@/Models/Order";
import Product from "@/Models/Product";
import User from "@/Models/User";
const jwt = require('jsonwebtoken')

const handler = async (req, res) =>{
  if(req.method === 'POST'){
    try {
      let verifyCart = true;
      let total = 0;
      const body = req.body;
      const cart = body.cart;
      for(let item in cart){
        let product = await Product.findOne({slug: item});
        if(product.availableQuantity < cart[item].quantity){
          verifyCart = 2;
          break;
        }
        if(product.price === cart[item].price){
          null;
          total += product.price*cart[item].quantity;
        }else{
          verifyCart = false;
          break;
        }
      }
      if(verifyCart === 2){
        return res.status(400).json({success: false, error: 'Product out of stock', message: 'Some items in your cart went out of stock. Please try again later.'});
      }
      if( verifyCart === false || body.subTotal !== total){
        return res.status(400).json({success: false, error: 'Cart does not match with product prices', message: 'Please check your cart and try again'})
      }
      if(req.body.phone.length < 10){
        return res.status(400).json({success: false, error: 'Invalid Phone Number', message: 'Please enter a valid phone number'});
      }
      if(req.body.pinCode.length !== 6){
        return res.status(400).json({success: false, error: 'Invalid Phone Number', message: 'Please enter a valid phone number'});
      }
      const email = body.email;
      const user = await User.findOne({email});
      const order = new Order({
        email: email,
        orderId: body.orderId,
        products: body.cart,
        amount: body.subTotal,
        address: body.address,
        city: body.city,
        state: body.state,
        pinCode: body.pinCode,
        phoneNumber: body.phone,
      });
      for(let item in cart){
        let product1 = await Product.findOne({slug: item});
        let newQuantity = product1.availableQuantity - cart[item].quantity;
        let product = await Product.findOneAndUpdate({slug: item}, {availableQuantity: product1.availableQuantity-cart[item].quantity});
      }
      await order.save();
      return res.status(200).json({success: true, message: 'Order placed successfully', orderId: body.orderId})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, error: 'Server error', message: 'Failed to place order'})
    }

    
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);