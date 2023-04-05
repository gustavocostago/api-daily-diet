import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../database'
import { Meal } from '../interfaces/meal-interface'
import auth from '../middleware/auth'

interface GetMealIdRequest extends FastifyRequest {
  id: string
}
export default async function meals(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [auth],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
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
    }
  )
  app.get(
    '/',
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const meals = await prisma.meal.findMany({
        where: {
          sessionId: sessionId,
        },
      })
      reply.status(200).send({ meals, total: meals.length })
    }
  )
  app.get(
    '/:id',
    {
      preHandler: [auth],
    },
    async (request: GetMealIdRequest, reply: FastifyReply) => {
      const { id } = request.params as GetMealIdRequest
      const meal = await prisma.meal.findUnique({
        where: {
          id: JSON.parse(id),
        },
      })
      reply.status(200).send({ meal })
    }
  )
}
