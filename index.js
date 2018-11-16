const express=require('express');

const app=express();

app.get('/',(req,res)=>{
res.send('<h2>Hello</h2>');
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{console.log("server started at port"+PORT)});