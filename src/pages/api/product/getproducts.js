import connectDB from "@/middleware/connection";
import Product from "@/Models/Product";
const handler = async (req, res) =>{
  // if(req.method == 'POST'){
    let products = await Product.find();
    let tShirts = {};
    for(let item of products.filter(product => product.category === 'TShirt')){
      if(item.title in tShirts){
        if(!tShirts[item.title].color.includes(item.color)){
          tShirts[item.title].color.push(item.color);
        }
        if(!tShirts[item.title].size.includes(item.size)){
          tShirts[item.title].size.push(item.size);
        }
      }else{
        tShirts[item.title] = JSON.parse(JSON.stringify(item));
          tShirts[item.title].color = [item.color];
          tShirts[item.title].size = [item.size];
      }
    }
    let hoodies = {};
    for(let item of products.filter(product => product.category === 'Hoody')){
      if(item.title in hoodies){
        if(!hoodies[item.title].color.includes(item.color)){
          hoodies[item.title].color.push(item.color);
        }
        if(!hoodies[item.title].size.includes(item.size)){
          hoodies[item.title].size.push(item.size);
        }
      }else{
        hoodies[item.title] = JSON.parse(JSON.stringify(item));
          hoodies[item.title].color = [item.color];
          hoodies[item.title].size = [item.size];
      }
    }
    let mugs = {};
    for(let item of products.filter(product => product.category === 'Mug')){
      if(item.title in mugs){
        if(!mugs[item.title].color.includes(item.color)){
          mugs[item.title].color.push(item.color);
        }
        if(!mugs[item.title].size.includes(item.size)){
          mugs[item.title].size.push(item.size);
        }
      }else{
        mugs[item.title] = JSON.parse(JSON.stringify(item));
          mugs[item.title].color = [item.color];
          mugs[item.title].size = [item.size];
      }
    }
    let stickers = {};
    for(let item of products.filter(product => product.category === 'Mug')){
      if(item.title in stickers){
        if(!stickers[item.title].color.includes(item.color)){
          stickers[item.title].color.push(item.color);
        }
        if(!stickers[item.title].size.includes(item.size)){
          stickers[item.title].size.push(item.size);
        }
      }else{
        stickers[item.title] = JSON.parse(JSON.stringify(item));
          stickers[item.title].color = [item.color];
          stickers[item.title].size = [item.size];
      }
    }
    res.status(200).json({ success: true, products: products, tShirts, hoodies: hoodies, mugs: mugs, stickers: stickers });
  // }else{
    // return res.status(401).json({success: false, error: 'Invalid request method', message: 'This api only supports POST method'});
  // }
}
export default connectDB(handler);