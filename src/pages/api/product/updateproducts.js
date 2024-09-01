import connectDB from "@/middleware/connection"
import Product from "@/Models/Product";

const handler = async (req, res) => {
  if (req.method === "PUT") { 
    try{
      for (let i = 0; i < req.body.length; i++) {
        let product = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);

    }
    return res.status(200).json({success: true, message: "Product has been updated successfully"});
  }catch (err){
    console.log('error: '+err);
    return res.status(500).json({success: false, error: 'Server error', message: 'Failed to update product'});
  }
  }else{
    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports PUT method'});
  }
}
export default connectDB(handler);