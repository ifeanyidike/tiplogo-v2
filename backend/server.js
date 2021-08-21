import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import cardRoutes from './routes/cardRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import cardOrderRoutes from './routes/cardOrderRoutes.js'
import jambChangeRoutes from './routes/jambChangeRoutes.js'
import jambPasswordResetRoutes from './routes/jambPasswordResetRoutes.js'
import oLevelResultUploadRoutes from './routes/oLevelResultUploadRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import AnnouncementRoutes from './routes/announcementRoutes.js'
import connectDatabase from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import path from 'path'
import { cloudinaryConfig } from './utils/cloudinarySetup.js'

dotenv.config()
//connect database
connectDatabase()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//configure body parser
app.use(express.json())

//middlewares
app.use('*', cloudinaryConfig)
app.use('/api/users', authRoutes)
app.use('/api/cards', cardRoutes)
app.use('/api/schools', schoolRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/cardorders', cardOrderRoutes)
app.use('/api/changeofcourseinstitution', jambChangeRoutes)
app.use('/api/jambpasswordreset', jambPasswordResetRoutes)
app.use('/api/olevelresultupload', oLevelResultUploadRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/announcement', AnnouncementRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paystack', (req, res) =>
  res.send(process.env.PAYSTACK_PUBLIC_KEY),
)
app.get('/api/config/flutterwave', (req, res) =>
  res.send(process.env.FLUTTERWAVE_PUBLIC_KEY),
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode or port ${PORT}`),
)
