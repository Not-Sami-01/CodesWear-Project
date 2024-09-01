import connectDB from "@/middleware/connection"
import User from "@/Models/User";
import md5 from "md5";

const handler = async(req, res) =>{
  if(req.method === 'POST'){
    try {
      const jwt = require('jsonwebtoken')
      const body = req.body;
      const token = body.token;
      let verify = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
      let user = await User.findOne({email: verify.email});
      if(user){
        const password = user.password;
        if(password == md5(body.prevPassword)){
          await User.findByIdAndUpdate(user._id, {password: md5(body.newPassword)})
          return res.status(200).json({success: true, message: 'Password updated successfully'});
        }else{
          return res.status(400).json({success: false, error: 'Invalid previous password', message: 'The previous password is incorrect'});
        }
      }else{
        return res.status(400).json({success: false, error: 'User not found', message: 'Some error occurred please login again and try again'});
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({success: false, error:'Some error occurred', message: 'Some technical error occurred please try again later'})
    }
  }else{
    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);