import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../database'

interface Meal {
  name: string
  description: string
  diet: boolean
  sessionId: string
}

export default async function meals(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { sessionId } = request.cookies
    const meal = request.body as Meal
    const newMeal = await prisma.meal.create({
      data: {
        name: meal.name,
        description: meal.description,
        diet: meal.diet,
        sessionId: sessionId,
      },
    })
    reply.status(201).send(newMeal)
  })
  app.get('/', async (request, reply) => {
    const { sessionId } = request.cookies
    const meals = await prisma.meal.findMany({
      where: {
        sessionId: sessionId,
      },
    })
    reply.status(200).send(meals)
  })
}
