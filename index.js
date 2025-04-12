import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import jwt, { decode } from "jsonwebtoken";



const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    const tokenString = req.header("Authorization")
    if (tokenString != null) {
        const token = tokenString.replace("Bearer ", "")
        

        jwt.verify(token, "cbc-batch-five@2025", 
            (err, decoded)=>{
                if (decoded != null) {
                    console.log(decoded)
                    req.user = decoded
                    next()
                }
                else {
                    console.log("Invalid Token")
                    res.status(403).json({
                        message : "Invalid Token"
                    }
                )
                }
                
            }
        )

    }
    else {
                    next()
                }
    
   // next()

    
}
)

mongoose.connect("mongodb+srv://admin:123@cluster0.npg1exe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ")
    .then(() => {
        console.log("Connected to the database")
    }).catch(() => {
        console.log("Database Connection Fail")
        
    })



app.use("/products", productRouter)
app.use("/users",userRouter)
    

app.listen(5000, () => {
    console.log("Server is Running on port 5000")
})

