const mongoose=require("mongoose");
const suggestionSchema= new mongoose.Schema({
  name: String,
  email: String,
  suggestion: String,
  date: String
});

module.exports = new mongoose.model('Suggestion', suggestionSchema);
