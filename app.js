const express=require("express");
const app=express();
const port=8025;
const path=require("path");
const ejsMate=require("ejs-mate");
const bodyParser=require("body-parser");
const methodOverride=require("method-override");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const passportLocal=require("passport-local");
const User=require("./Model/user.js");
const mongoose=require("mongoose");


app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(bodyParser.json());


app.use(methodOverride("_method"));

const sessionOption = ({
    secret: "musecretcode",
    resave: false,
    saveUninitialized: true,
})


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.user=req.user;
    res.locals.time=req.time;
    res.locals.result=req.result;
    next();
})

async function main() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect("mongodb://127.0.0.1:27017/freshgroce", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // serverSelectionTimeoutMS: 20000,  
        });
        console.log("Successful connection to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

main().
    then(() => {
        console.log("sucessful connection");
    }).catch((err) => {
        console.log(err);
    })

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



app.get("/sign",(req,res)=>{
    res.render("sign.ejs");
})

app.post("/sign",async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const register=await User.register(newUser,password);
        res.redirect("/");
        console.log(register);
    }catch(err){
        console.log(err);
        res.redirect("/sign");
    }
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    console.log("login");
    res.redirect("/");
})

app.get("/logout", (req, res) => {
    try {
        req.logOut((err) => {
            if (err) {
                nextTick(err);
            }
            res.redirect("/");
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("please fill the data");
    }
})

app.get("/cart",(req,res)=>{
    res.render("cart.ejs");
})

app.listen(port,(req,res)=>{
    console.log(`server working on ${port}`);
})