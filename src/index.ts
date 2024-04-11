import dotenv from 'dotenv'
import express, { Express } from 'express'
import api from './router/api'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello world");
// });

app.use('/api', api)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
