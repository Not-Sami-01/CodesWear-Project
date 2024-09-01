import connectDB from "@/middleware/connection"
import Order from "@/Models/Order";
import User from "@/Models/User";

const handler = async (req, res) =>{
  if(req.method === 'POST'){
    try {
      
      const userId = req.body.userId;
      const orderId = req.body.id;
      const user = await User.findById(userId);
      if(!user){
        return res.status(400).json({ success: false, error: 'User not found', message: 'User does not exist in our database' });
      }
      const email = user.email;
      const order = await Order.findOne({orderId});
      if(!order){
        return res.status(400).json({ success: false, error: 'Order not found', message: 'Order does not exist' });
      }
      if(order.email === email){
        return res.status(200).json({success: true, order: order, message: 'Congrats! Order placed successfully'});
      }
      return res.status(400).json({ success: false, error: 'Order not found', message: 'Order does not exist' });
    } catch (error){
      console.log(error)
      return res.status(404).json({ success: false, error: 'Some error ocurred', message: 'There are some technical issues please try again later'}); 
    }
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);