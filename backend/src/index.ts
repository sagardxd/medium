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


app.use("/*", async (c, next) => {
  // Allow requests only from your frontend domain
  c.res.headers.set("Access-Control-Allow-Origin", "https://medium-chi-swart.vercel.app");
  // Allow credentials (cookies) to be sent
  c.res.headers.set("Access-Control-Allow-Credentials", "true");
  // Set allowed methods
  c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // Set allowed headers
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (c.req.method === "OPTIONS") {
    c.res = new Response(null, { status: 200 });
    return c.res;
  }

  await next();
});

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
