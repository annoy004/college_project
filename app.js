const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/condidate-vote");

const candidateSchema ={
    name : String,
    party:String,
    year:String,
    branch:String,
    vote:Number
  
} 
const Candidate = mongoose.model("Candidate",candidateSchema);

const voterSchema ={
    name : String,
    email:String,
    year:String,
    branch:String,

  
} 
const Voter = mongoose.model("Voter",voterSchema);

const passwordSchema = {
    password:String,
}
const Passwrd = mongoose.model("Passwrd", passwordSchema);


const passing = new Passwrd({
  password : "tcet@123"
});
//   passing.save();

const app = express();
app.use(bodyparser.urlencoded({entended : true}));
app.set('view engine','ejs');

app.use(express.static("public"));

app.post("/",function(req,res) {
    const candidnames = req.body.candidname;
    const candidparty = req.body.candidparty;
    const years = req.body.year;
    const branchs = req.body.branch;
    console.log(candidnames);
   
   
    
    console.log(candidparty);
    const getdocument = async () => {
        try{
    const resultics = await Candidate.findOne({ name: candidnames }).exec();
    console.log (resultics);

        if (resultics === null ) {
            const createDocumentics = async () => {
                try{
                    const list = new Candidate({
                                name :candidnames,
                                 party : candidparty,
                                 year:years,
                                 branch : branchs,

                            });
                            list.save()
               
                res.redirect("/voteadmin");
                
                }catch(err) {
                console.log(err);
                } 
               
              } 
            createDocumentics();

        }else {
            

        }
    }catch(err){
     console.log(err);
    }
      }
     
      

      getdocument();  
    
})

app.post("/incrvote",function(req,res) {
    const remove = req.body.checkbox;
    console.log(remove);
    const timepass =async () => { 
     try{
    let product = await Candidate.findOneAndUpdate({_id : remove}, { $inc: { vote: 1 }});
    
 
    console.log(product)
    res.redirect("/home")
    
     }catch(err) {
         console.log(err);
         }
    }
    timepass();
 
 });

 



app.get("/voter", function(req,res) {
    res.render("list");
})
app.get("/candidate", function(req,res) {
   
    res.render("list2");
})

app.get("/candidatelogin", function(req,res) {
   
    res.render("list11");
})
app.get("/adminlogin", function(req,res) {
   
    res.render("list22");
})

app.get("/home", function(req,res) {
   
    res.render("list33");
})
app.get("/votecandid", function(req,res) {
    const renderDoc = async () => {
        try{    const result = await Candidate.find({});
        console.log(result);
        res.render("list3",{candiditems:result});
           
            
        }catch(err) {
        console.log(err);
        }
      
      } 
      renderDoc();
   
})
app.get("/voteadmin", function(req,res) {
    const renderDoc = async () => {
        try{    const result = await Candidate.find({});
        console.log(result);
        res.render("list4",{candiditems:result});
           
            
        }catch(err) {
        console.log(err);
        }
      
      } 
      renderDoc();
   
})
app.listen( 3000,function() { 
    console.log("server is running on port 3000");
})




app.post("/voter",function(req,res) {
    
   const votname = req.body.vname;
   const votemail = req.body.vemail;
   const votyear = req.body.vyear;
   const votbranch = req.body.vbranch;



    console.log(votemail);
    const getdocument = async () => {
        try{
    const resultocs = await Voter.findOne({ name: votemail }).exec();
    console.log (resultocs);

        if (resultocs === null ) {
            const createDocumentics = async () => {
                try{
                    const voter = new Voter({
                                name :votname,
                                 email :votemail ,
                                 year:votyear,
                                 branch : votbranch,

                            });
                            voter.save();
               
                 res.redirect("/votecandid");
                }catch(err) {
                console.log(err);
                } 
               
              } 
            createDocumentics();

        }else {
            

        }
    }catch(err){
     console.log(err);
    }
      }
     
      

      getdocument();  
    
});

app.post("/pass",function(req,res) {
    const pass = req.body.masspass;
    console.log(pass);
    const getdocument = async () => {
        try{
    const resultics = await Passwrd.findOne({ password:pass }).exec();
    console.log (resultics);

        if (resultics === null ) {
         res.send("password is wrong")

        }else {
            
        res.redirect("/voteadmin")
        }
    }catch(err){
     console.log(err);
    }
      }
     
      

      getdocument();  
    
})



