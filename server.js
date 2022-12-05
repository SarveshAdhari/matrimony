import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import morgan from 'morgan'
import connectDB from './db/connect.js'
import authRouter from './routes/authRouter.js'
import notFoundMiddleware from './middleware/notFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'
import {fileURLToPath} from 'url'
import {dirname} from 'path'
import path from 'path'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

const app = express()
dotenv.config()


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname,'./client')))

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

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