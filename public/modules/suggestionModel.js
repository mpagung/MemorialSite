const mongoose=require("mongoose");
const suggestionSchema= new mongoose.Schema({
  name: String,
  suggestion: String,
  email: String,
  date: String
});

module.exports = new mongoose.model('Suggestion', suggestionSchema);
