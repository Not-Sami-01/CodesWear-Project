import connectDB from "@/middleware/connection"
import User from "@/Models/User"

const handler = async (req, res) =>{
  if(req.method === 'POST'){
  try {
    const token = req.body.token;
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
    const user = await User.findOne({email: decoded.email}).select('-password');
      if(user){
        return res.status(200).json({success: true, user});
      }else{
        return res.status(404).json({success: false, error: 'Invalid email address', message: 'User not found'});
      }
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, error: 'Some error occured', message: 'Some error occured please try again later'});
  }
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);