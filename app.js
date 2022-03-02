const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +  "/date.js")

// Object of Express
const app = express();

// This will by default looks in views folder for the files to render
app.set('view engine', 'ejs');    
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res){ 
    
    const day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    }); // This method will use view engine.
});

app.post("/", function(req, res){
    
    const item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work"); 
    }else{
        items.push(item);
        res.redirect("/");
    }  
});

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
});

app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function(){
    console.log("Server is listening at Port 3000");
});