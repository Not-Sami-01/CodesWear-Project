const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
    products:
      {
        type: Object,
        required: true,
      }
    ,
    paymentStatus: {
      type: String,
      default: 'Initiated',
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    paymentInfo: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: true
    },
    city: {type: String, required: true },
    state: {type: String, required: true },
    pinCode: {type: String, required: true },
    phoneNumber: {type: String, required: true },

    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },

  
}, {
  timestamps: true
});
mongoose.models = {}
export default mongoose.model('Order', OrderSchema)