const express=require("express");
const app=express();

function subscribe(req,res,body){
  var fullName=body.inputName;
  var email=body.inputEmail;
  var weekReminder=body.week;
  var threeDReminder=body.threeD;
  var oneDReminder=body.oneD;
  var zeroDReminder=body.zeroD;
  var tags=[];
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
  request.end();
  console.log(hi);
}

exports.subscribe=subscribe();
