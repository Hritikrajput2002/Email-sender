const express=require('express');
const cors=require('cors')
require('dotenv').config({path:'./Config/.env'});
const app=express();
const users=require('./Routes/userRoutes')
const path = require('path');



//middlewares
app.use(cors({
   origin: ['http://localhost:3000', 'https://email-sender-two-zeta.vercel.app/'],
   credentials: true,
}));







app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/v1',users)


app.listen(process.env.port,()=>{
   console.log(`server is listening at  http://localhost:${process.env.port}`)
})


