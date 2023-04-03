import { FastifyInstance } from 'fastify'
import { prisma } from '../database'

export default async function meals(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const newUser = await prisma.meal.create({
      data: {
        name: request.body.name,
        description: request.body.description,
        diet: request.body.diet,
      },
    })
    reply.status(201).send(newUser)
  })
  app.get('/', async (request, reply) => {
    const users = await prisma.user.findMany()
    reply.status(200).send(users)
  })
}
