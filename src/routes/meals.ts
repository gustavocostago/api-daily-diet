import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../database'

interface Meal {
  description: string
  diet: boolean
}

export default async function meals(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const meal = request.body as Meal
    const newMeal = await prisma.meal.create({
      data: {
        description: meal.description,
        diet: meal.diet,
      },
    })
    reply.status(201).send(newMeal)
  })
  app.get('/', async (request, reply) => {
    const users = await prisma.user.findMany()
    reply.status(200).send(users)
  })
}
