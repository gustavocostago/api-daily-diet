import { FastifyInstance } from 'fastify'
import { prisma } from '../database'

export default async function users(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const newUser = await prisma.user.create({
      data: {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        sessionId: request.body.sessionId,
      },
    })
    reply.status(201).send(newUser)
  })
  app.get('/', async (request, reply) => {
    const users = await prisma.user.findMany()
    reply.status(200).send(users)
  })
}
