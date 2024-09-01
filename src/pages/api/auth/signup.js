import connectDB from "@/middleware/connection"
import User from "@/Models/User"
import md5 from "md5";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      let findOne = await User.findOne({email: req.body.email});
      if(findOne){
        return res.status(400).json({ success: false, error: 'Email already exists', message: 'Email is already registered to our website' });
      }
      if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({ success: false, error: 'Passwords do not match', message: 'Password fields do not match' });
      }
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
      });
      await user.save();
      return res.status(200).json({ success: true, message: 'Hello world', name: req.body.name, email: req.body.email });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: 'Server error', message: 'Some error occured please try later' });
    }
  } else {

    return res.status(401).json({ success: false, error: 'Invalid request method', message: 'This api only supports POST method' })
  }
}
export default connectDB(handler);