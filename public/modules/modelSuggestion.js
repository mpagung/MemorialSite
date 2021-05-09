const mongoose=require("mongoose");
const suggestSchema= new mongoose.Schema({
  name: String,
  email: String,
  suggestion: String
});
module.exports = new mongoose.model('Suggestion', suggestSchema);
