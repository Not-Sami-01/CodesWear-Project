import connectDB from "@/middleware/connection"

const handler = (req, res) =>{
  if(req.method === 'POST'){
    try {
      const jwt = require('jsonwebtoken');
      const body = JSON.parse(req.body)
      const val = jwt.verify(body.token, process.env.NEXT_PUBLIC_JWT_KEY);
      res.status(200).json({success: true, auth: val});
    } catch (error) {
      console.log(error)
      return res.status(200).json({success: false, error: 'Error verifying token', message: 'Some error ocurred please try again later'})
    }
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);