const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({entended : true}));
app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/voter", function(req,res) {
    res.render("list");
})
app.get("/candidate", function(req,res) {
    res.render("list2");
})
app.listen( 3000,function() { 
    console.log("server is running on port 3000");
})