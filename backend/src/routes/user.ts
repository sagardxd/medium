import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signinInput, signupInput} from '@sagardxd/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_PASSWORD: string
    }
}>();


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json("input errors")
    }
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
        
        const jwt = await sign({ id: user.id }, c.env.JWT_PASSWORD)
        setCookie(c, "jwt", jwt, {    secure: true, // Set to true if your site is served over HTTPS
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'None', // Allows the cookie to be sent in cross-site requests
        path: '/'})
        c.status(201);
        return c.text('signup hogya')
        
    } catch (error) {
        c.status(411);
        return c.text("Invalid");
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json("input errors")
    }
    console.log("hi")
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })
        console.log(user?.email)
        if (!user) {
            c.status(403);
            return c.text("User does not exsist");
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_PASSWORD)
        setCookie(c, "jwt", jwt, {    secure: true, // Set to true if your site is served over HTTPS
        httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'None', // Allows the cookie to be sent in cross-site requests
        path: '/'})

        c.status(201);
        return c.text('signin hogya')

    } catch (error) {
        console.log(error)
        return c.text("Invalid");
    }
})

userRouter.get('/signin', async (c) => {
    const body = await c.req.json();
    return c.text("jeu")
})