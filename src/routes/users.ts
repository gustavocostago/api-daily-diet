import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../database'
import { randomUUID } from 'crypto'

interface User {
  name: string
  email: string
  password: string
  sessionId: string
}

export default async function users(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.body as User
    const session_id = randomUUID()
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        sessionId: session_id,
      },
    })
    reply.setCookie('sessionId', session_id)
    reply.status(201).send(newUser)
  })
  app.get('/', async (request, reply) => {
    const users = await prisma.user.findMany()
    reply.status(200).send(users)
  })
}
