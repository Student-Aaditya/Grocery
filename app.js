const express=require("express");
const app=express();
const port=8025;
const path=require("path");
const ejsMate=require("ejs-mate");

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));



app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.get("/detail",(req,res)=>{
    res.render("detail.ejs");
})

app.get("/feature",(req,res)=>{
    res.render("feature.ejs");
})

app.get("/product",(req,res)=>{
    res.render("product.ejs");
})

app.get("/service",(req,res)=>{
    res.render("service.ejs");
})

app.get("/blog",(req,res)=>{
    res.render("blog.ejs");
})

app.get("/team",(req,res)=>{
    res.render("team.ejs");
})

app.get("/testimonial",(req,res)=>{
    res.render("testimonial.ejs");
})

app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})