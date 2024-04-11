import express from 'express'
import imageRouter from './images'

const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
  res.send('Hello world')
})

apiRouter.use('/images', imageRouter)

export default apiRouter
