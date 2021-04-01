const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
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
