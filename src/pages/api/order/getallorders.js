import connectDB from "@/middleware/connection"
import Order from "@/Models/Order";

const handler = async (req, res) =>{
  if(req.method === 'POST'){
    const email = req.body.email;
    const allOrders = await Order.find({email});
    if(!allOrders){
      return res.status(401).json({success: false, error: 'No order found', message: 'There is no order placed by your account'})
    }
    return res.status(200).json({success: true, orders: allOrders});
  }else{
    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})

  }
}
export default connectDB(handler);