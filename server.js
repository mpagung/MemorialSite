const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

const bodyParser = require("body-parser");
const https = require("https");
const dotenv = require('dotenv');
dotenv.config();

app.set("view_engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

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
  res.sendFile(__dirname+"/suggest.html");
});

app.get("/subscribe", (req, res) => {
  res.render("subscribe.ejs");
});

app.post("/subscribe", (req, res) => {
  var fullName=req.body.inputName;
  var email=req.body.inputEmail;
  var data={
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields: {
          FULLNAME:fullName
        }
      }
    ]};

  const jsonData=JSON.stringify(data);

  const api_key=process.env.MAILCHIMP_KEY;
  const list_id=process.env.LIST_ID;
  const url = "https://"+"us7"+".api.mailchimp.com/3.0/lists/"+list_id;
  const options = {
    method : "POST",
    auth: "mpagung:"+api_key
  }
  console.log("api_key is:"+api_key, list_id);
  const request = https.request(url,options,function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData);
  request.end();

});



app.get("/wip/:pageName", (req, res) => {
  res.render("wip.ejs",{pageName:req.params.pageName});
});
