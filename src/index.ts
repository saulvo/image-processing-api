import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import api from './router/api'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send(`
  <h1>Image Processing API</h1>
  <div>
    <p>Endpoint: /api/images</p>
    <p>Query parameters:</p>
    <ul>
      <li>filename: string</li>
      <li>width: number</li>
      <li>height: number</li>
    </ul>
    <p>Example: <a href="http://localhost:3000/api/images?width=500&height=500&filename=santamonica">http://localhost:3000/api/images?width=500&height=500&filename=santamonica</a></p>
  </div>
  `)
})

app.use('/api', api)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
