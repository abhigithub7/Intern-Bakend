import express from 'express'
import dotenv from 'dotenv'
import connectDb from './Config/Db.js'
import UserRouter from './Router/User.Route.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 6000



app.get('/', (req, res) => {
  res.send('Welcome to my server !')
})

app.use(express.json())

app.use("/api",UserRouter)

app.listen(port, () => {
  console.log(`🚀Example app listening on port ${port}`)
  connectDb()
})
