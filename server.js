import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import connectDB from './db/connect.js'
import authRouter from './routes/authRouter.js'
import notFoundMiddleware from './middleware/notFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'

const app = express()
dotenv.config()
app.use(express.json())

app.get('/',(req, res)=>{
    res.send('Welcome')
})

app.use('/api/v1/auth',authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()