import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import incomeRoute from './routers/income.route.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors());

app.use('/income', incomeRoute);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://artGuardian:${process.env.PASSWORD}@cluster0.5byfhar.mongodb.net/?retryWrites=true&w=majority`)
      .then(() => {
        console.log('DB ok')
      })
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

