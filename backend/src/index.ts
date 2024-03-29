import { Hono } from 'hono'

import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_PASSWORD: string
  }
}>()

app.use("/*", cors({
  origin: 'https://medium-one-fawn.vercel.app', // Adjust this to match your frontend origin
  credentials: true,
 }));




app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
