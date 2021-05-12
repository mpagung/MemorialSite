const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors"),
  bodyParser = require("body-parser"),
  https = require("https"),
  dotenv = require('dotenv');

const fs = require('fs');
const mongoose=require("mongoose");
const url=process.env.MONGO_URL;
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
var imgModel = require('./public/modules/models');
var suggestionModel = require("./public/modules/suggestionModel");
var subscriptionModel = require('./public/modules/subscriptionModel');
const validateEmail = require("./public/modules/validateEmail");
const path = require('path');


app.set("view_engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });




app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  var test=req.body;
  console.log(test);
});

app.post("/", (req, res) => {
  var test=req.body;
  console.log(test);
});

app.get("/suggest", (req, res) => {
  res.render("suggest.ejs");
});

app.post("/suggest", (req, res) => {
  var obj = {
      name: req.body.inputName,
      email: req.body.inputEmail,
      suggestion: req.body.inputSuggestion,
      date:new Date()
  }
  suggestionModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          res.render("suggestSuccess.ejs");
      }
  });
});

app.get("/subscribe", (req, res) => {
  res.render("subscribe.ejs");
});

app.get("/subscriptionSuccess", (req, res) => {
  res.render("subscriptionSuccess.ejs");
});
app.get("/subscriptionFailed", (req, res) => {
  res.render("subscriptionFailed.ejs");
});

app.post("/subscribe", (req, res) => {
  var fullName=req.body.inputName;
  var email=req.body.inputEmail;
  var weekReminder=req.body.week;
  var threeDReminder=req.body.threeD;
  var oneDReminder=req.body.oneD;
  var zeroDReminder=req.body.zeroD;
  var tags=[];
  if(validateEmail(email)){
    if (weekReminder){
      tags.push("WeekReminder")
    }
    if (threeDReminder){
      tags.push("threeDaysReminder")
    }
    if (oneDReminder){
      tags.push("oneDayReminder")
    }
    if (zeroDReminder){
      tags.push("zeroDayReminder")
    }

    var data={
      members: [
        {
          email_address:email,
          status:"subscribed",
          merge_fields: {
            FULLNAME:fullName
          },
          tags : tags
        }
      ]};

      // var mongoDBobject={
      //   name: fullName,
      //   email: email,
      //   reminders: tags.toString(),
      //   date: new Date()
      // }
      //
      // subscriptionModel.create(mongoDBobject, (err, item) => {
      //     if (err) {
      //         console.log(err);
      //     }
      //     else {
      //         res.redirect('/');
      //     }
      // });

    const jsonData=JSON.stringify(data);

    const api_key=process.env.MAILCHIMP_KEY;
    const list_id=process.env.LIST_ID;
    const url = "https://"+"us7"+".api.mailchimp.com/3.0/lists/"+list_id;
    const options = {
      method : "POST",
      auth: "mpagung:"+api_key
    }
    const request = https.request(url,options,function(response){
      response.on("data", function(data){
        // console.log(JSON.parse(data))
      })
    })

    request.write(jsonData);
    // request.on('error', function(e) {
    //   console.error(e);
    // });
    request.end();
    res.redirect("/subscriptionSuccess");
    return;
  } else {
    res.redirect("/subscriptionFailed");
    return;
  }

});

app.get("/upload", (req,res)=>{
  imgModel.find({verified:false}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('uploadImage.ejs', { items: items});
        }
    });
})

app.post("/upload", upload.single('image'), (req,res,next)=>{
    var tempPath=path.join(__dirname + '/uploads/' + req.file.filename)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(tempPath),
            contentType: 'image/png'
        },
        isImage: true,
        verified: false,
        row: -1,
        col: -1
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            fs.unlinkSync(tempPath);
            res.redirect('/');
        }
    });
});

app.get("/album", (req,res)=>{
  imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('album.ejs', { items1: items.filter((item)=>item.col===1),items2: items.filter((item)=>item.col===2),items3: items.filter((item)=>item.col===3),items4: items.filter((item)=>item.col===4) });
        }
    });
})

app.get("/suggestion", (req,res)=>{
  res.render("suggestion.ejs")
})

app.post("/suggestion",(req,res)=>{
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

app.get("/suggestion", (req,res)=>{

})

app.get("/wip/:pageName", (req, res) => {
  res.render("wip.ejs",{pageName:req.params.pageName});
});
