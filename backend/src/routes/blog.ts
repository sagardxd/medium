import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@sagardxd/medium-common'


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
  if (!jwtCookie) {
    c.status(401);
    return c.json({ msg: "Not authorized" })
  }
  try {
    const payload = await verify(jwtCookie, c.env.JWT_PASSWORD);
    if (!payload) {
      c.status(401);
      return c.json({ msg: "Not authorized" })
    }
    c.set("userId", payload.id)
    await next();
  } catch (error) {
    console.log(error)
    return c.json("error")
  }

})



blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json("input errors")
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const userID = c.get('userId');
    console.log('aa')
    const blogPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userID
      }
    })
    c.status(201);
    return c.json({ "created": blogPost.id })
  } catch (error) {
    c.status(411);
    return c.json("error while creating post")
  }
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json(blogs);
  } catch (error) {
    return c.json("error")
  }
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

    if (!blog) return c.json("Blog does'nt exsist")

    return c.json(blog);
  } catch (error) {
    return c.json("error")
  }

})

blogRouter.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json("input errors")
  }


  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        title: body.title,
        content: body.content
      }
    })

    if (!blog) return c.json("Blog not updated")

    return c.json("Blog updated");
  } catch (error) {
    return c.json("error")
  }

})


