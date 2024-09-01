import connectDB from "@/middleware/connection"
import User from "@/Models/User"
import md5 from "md5"
const handler = async (req, res) =>{
  var jwt = require('jsonwebtoken');
  if(req.method === 'POST'){
    let user = await User.findOne({email: req.body.email});
    if(user){
      if(user.password == md5(req.body.password)){
        let token = jwt.sign({ email: req.body.email, name: user.name }, process.env.NEXT_PUBLIC_JWT_KEY);
        return res.status(200).json({success: true, message:'Logged in successfully', email: user.email, userId: user._id, name: user.name, token: token});
      }else{
        return res.status(400).json({success: false, message: 'Invalid Credentials'})
      }
    }else{
      return res.status(400).json({success: false, message: 'Invalid Credentials'})
    }
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);