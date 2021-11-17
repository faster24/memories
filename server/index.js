import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use( bodyParser.json({limit: "30mb" , extended: true}))
app.use( bodyParser.urlencoded({limit: "30mb" , extended: true}))

//middleware
app.use(cors())

//routes

app.use('/posts' , postRoutes )

//db connect
const connectionURL = process.env.CONNECTION_URL
const port = process.env.PORT || 5000;
 

mongoose.connect( connectionURL , { useNewUrlParser: true , useUnifiedTopology: true })
.then( () => app.listen(port , () => console.log(`Server is running on port : ${port}`)   ))
.catch((e) => console.log({error: e.message }))




