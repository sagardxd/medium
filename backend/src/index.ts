import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_PASSWORD: string
  }
}>()

app.post('/api/v1/user/signup', async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    })

    const jwt = await sign({id: user.id}, c.env.JWT_PASSWORD)
    setCookie(c,"jwt",jwt)
    c.status(201);
    return c.text('signup hogya')

  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
})

app.post('/api/v1/user/signin', async(c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if(!user){
      c.status(403);
      return c.text("User does not exsist");
    }

    const jwt = await sign({id: user.id}, c.env.JWT_PASSWORD)
    setCookie(c,"jwt",jwt)
    c.status(201);
    return c.text('signin hogya')

  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
})

app.post('/api/v1/blog', (c) => {
  return c.text("blog route")
})


app.put('/api/v1/user/signin', (c) => {
  return c.text("signin route")
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  console.log(id)
  return c.text("signin route")
})

app.put('/api/v1/blog/bulk', (c) => {
  return c.text("blog bulk route")
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
