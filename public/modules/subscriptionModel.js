const mongoose=require("mongoose");
const subscriptionSchema= new mongoose.Schema({
  name: String,
  email: String,
  reminders: String,
  date: String
});

module.exports = new mongoose.model('Subscription', subscriptionSchema);
