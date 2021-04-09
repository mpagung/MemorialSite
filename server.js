const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors"),
  bodyParser = require("body-parser"),
  https = require("https"),
  dotenv = require('dotenv'),
  subscribeModule = require('./public/module/subscribeModule.js');

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

app.get("/subscriptionSuccess", (req, res) => {
  res.render("subscriptionSuccess.ejs");
});

app.post("/subscribe", (req, res) => {
  const body=req.body;
  subscribeModule(req,res,body);
  res.redirect("/subscriptionSuccess");

});



app.get("/wip/:pageName", (req, res) => {
  res.render("wip.ejs",{pageName:req.params.pageName});
});
