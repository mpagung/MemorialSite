const mongoose=require("mongoose");
const imageSchema= new mongoose.Schema({
  name: String,
  desc: String,
  isImage: Boolean, //if false, item is a note and not an image
  verified: Boolean, //if true, item is displayed
  row: Number,
  col: Number, //max column is 4
  img: {data:Buffer, contentType:String}
});

module.exports = new mongoose.model('Image', imageSchema);
