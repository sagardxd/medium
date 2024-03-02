import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_PASSWORD: string
    }
  }>();

blogRouter.use('/*', async (c, next) => {

})

blogRouter.post('/', async(c) => {
    return c.text("blog route")
})

blogRouter.get('/:id', async(c) => {
    const id = c.req.param('id');
    console.log(id)
    return c.text("blog id route")
})

blogRouter.put('/bulk', async(c) => {
    return c.text("blog bulk route")
})