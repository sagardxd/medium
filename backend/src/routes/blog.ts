import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
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

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
      const user = await verify(authHeader, c.env.JWT_PASSWORD);
      if (user) {
          c.set("userId", user.id);
          await next();
      } else {
          c.status(403);
          return c.json({
              message: "You are not logged in"
          })
      }
  } catch(e) {
      c.status(403);
      return c.json({
          message: "You are not logged in"
      })
  }
});


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


