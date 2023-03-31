import express from 'express'
import homeRoute from './views/home.js'
import customerRoutes from './views/customer.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { db } from './db.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use('/home', homeRoute)
app.use('/customer', customerRoutes)

app.listen(5000, () => console.log('Server started successfully'))