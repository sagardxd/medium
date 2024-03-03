import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { getCookie} from 'hono/cookie'
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_PASSWORD: string
  },
  Variables: {
    userId: string
  }
}>();

//middleware
blogRouter.use('/*', async (c, next) => {
      const jwtCookie = getCookie(c, "jwt");
      if(!jwtCookie) {
        c.status(401);
        return c.json({msg: "Not authorized"})
      }

      const payload = await verify(jwtCookie, c.env.JWT_PASSWORD);
      if(!payload){
        c.status(401);
        return c.json({msg: "Not authorized"})
      }
      c.set("userId", payload.id)
      await next();
})

blogRouter.post('/', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  return c.text("blog route")
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  console.log(id)
  return c.text("blog id route")
})

blogRouter.put('/bulk', async (c) => {
  return c.text("blog bulk route")
})
