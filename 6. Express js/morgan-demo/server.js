import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(
  morgan(":method :url :user-agent")
);
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/users", (req, res) => {
  res.json([
    {
      id:1,
      name:"Ram"
    },
    {
      id:2,
      name:"Hari"
    }
  ]);
});

app.post("/users", (req, res) => {

    res.json({
        message:"User Created"
    })

});

app.delete("/users/:id", (req,res)=>{

    res.json({
        message:"User Deleted"
    })

})

app.get("/error",(req,res)=>{

    throw new Error("Something Wrong")

})
app.get("/slow",(req,res)=>{

    setTimeout(()=>{

        res.send("Slow API")

    },3000)

})

app.listen(3000);