import connectDB from "@/middleware/connection"
import User from "@/Models/User";

const handler = async (req, res) =>{
  if(req.method === 'POST'){
    const jwt = require('jsonwebtoken');
    try {
      const verify = jwt.verify(req.body.token, process.env.NEXT_PUBLIC_JWT_KEY);
      const {name, phone,email, pinCode, state, city, address} = req.body;
      await User.findOneAndUpdate({email},{name, phoneNumber: phone, state, pinCode, city, address });
      return res.status(200).json({success: true, message: 'Account updated successfully'});
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, error: 'Error updating user', message: 'Some error occurred while updating user'})
    }
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);