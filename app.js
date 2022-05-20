const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const fname = req.body.fname;
const lname = req.body.lname;
const email = req.body.email;
const data ={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname,

            }

        }
    ]
};
const jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/c5573e7e14";
const option={
    method:"POST",
    auth :"its_rm:8c859a421626f5c8cfdec240acc04ca2-us5"
}
const request = https.request(url,option,function(response){
    if(response.statusCode===200){
res.sendFile(__dirname+"/success.html")
}else{
        res.sendFile(__dirname+"/failure.html")
       
    }
    response.on("data",function(data){
       console.log( JSON.parse(data));

    })
})

request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
let port = process.env.PORT;
if(port==null||port==""){
  port = 3000;
}
app.listen(port,function(){
    console.log("server is running in 3000 port");
})
// apikey
// 8c859a421626f5c8cfdec240acc04ca2-us5
// Lxit ID
// c5573e7e14