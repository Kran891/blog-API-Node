const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require('cors');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
var allowedOrigins = ['http://localhost:3000',
                      'http://yourapp.com'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
        console.log(origin);
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
mongoose.connect("mongodb://localhost:27017/blogdb");
const blogSchema=new mongoose.Schema(
    {
        title:String,
        content:String
    }
);
const blogs=mongoose.model("blogs",blogSchema);
app.get("/getblogs",async function(req,res){
res.json( await blogs.find({}));
});
app.get("/getblogs/:id",async function(req,res){
    res.json(await blogs.findById(req.params.id));
})
app.listen(3018,function(){
    console.log("Running on 3018");
})
