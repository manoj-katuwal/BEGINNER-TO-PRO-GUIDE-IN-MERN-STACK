const express = require("express");
const cookieParser = require("cookie-parser");



const app = express();
app.use(cookieParser());

const PORT = 5000;

app.get('/', (req, res)=>{
    res.cookie("username", "manoj", {
        httpOnly: true
    });
    res.cookie("theme", "dark");
     res.cookie("language", "en");
    //  res.send(req.headers.cookie)
    res.send(" 3 Cookie has been created successfully");

    
})

app.get("/profile", (req, res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})
app.get("/username", (req, res)=>{
    res.send(req.cookies.username)
})

app.get("/theme", (req, res)=>{
    res.send(req.cookies.theme);
})

app.get("theme-updated", (req, res)=> {
    res.cookie("theme", "light");
    res.send("Updated theme value ")
})

app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})