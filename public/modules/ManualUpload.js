//set variables according to columns:
const colNumbers=[1,2,3,4];
const today=new Date();
const date=today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

const mongoose=require("mongoose");

const dotenv = require("dotenv");
dotenv.config({path:__dirname+'/../../.env'});

const url=process.env.MONGO_URL;
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
var imgModel = require('./models');

const fs = require("fs");


// imgModel.find();
imgModel.deleteMany({}, (err)=>{
  console.log(err)
})
colNumbers.map(colNumber=>{
  var path="../../../pictures/"+colNumber+"/";
  const files = fs.readdirSync(path);
  var amount=files.length;
  var i=1;
  files.map(file=>{

    var obj = {
        name: file,
        desc: "manual add by admin on "+date,
        img: {
            data: fs.readFileSync(path+file),
            contentType: 'image/png'
        },
        isImage: true,
        verified: true,
        row: -1,
        col: colNumber
      }
      imgModel.create(obj, (err, item) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Uploading image..."+i+"/"+amount+"of row "+colNumber);
            i++
              // res.redirect('../views/uploadSuccess');
          }
      });
    })
})
console.log("Uploading images completed");


//insertmany local pictures
