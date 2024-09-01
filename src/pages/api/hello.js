import connectDB from "@/middleware/connection"

const handler = (req, res) =>{
  if(req.method === 'POST'){
    
    return res.status(200).json({success: true, message: 'Hello world'})
  }else{

    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'})
  }
}
export default connectDB(handler);