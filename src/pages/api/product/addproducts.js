const { default: connectDB } = require("@/middleware/connection")
const { default: Product } = require("@/Models/Product")

const handler = async (req, res) => {
  if (req.method === "POST") {
    var data;
    for( let i = 0 ; i< req.body.length ; i++){
      let product = new Product({
        title: req.body[i].title,
        slug:req.body[i].slug,
        des: req.body[i].des,
        img:req.body[i].img,
        category:req.body[i].category,
        size: req.body[i].size,
        color: req.body[i].color,
        price: req.body[i].price,
        availableQuantity: req.body[i].availableQuantity,
      });
      data = await product.save();
    }
    return res.status(200).json({success: true, message: 'Product has been added successfully', data})
    }else{
    return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'});
    }
}
export default connectDB(handler);