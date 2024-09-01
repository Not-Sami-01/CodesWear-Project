const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String},
  cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  address: {
    type: String, default: '',
  },
  city: {type: String, default: ''},
  state: {type: String, default: ''},
  pinCode: {type: String, default: ''},
  phoneNumber: {type: String, default: ''}
})

mongoose.models = {}
export default mongoose.model('User', UserSchema);