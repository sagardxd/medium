import {Hono} from 'hono'
import {setCookie } from 'hono/cookie'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_PASSWORD: string
    }
  }>();

userRouter.post('/signup', async (c) => {
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
  
  userRouter.post('/signin', async(c) => {
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