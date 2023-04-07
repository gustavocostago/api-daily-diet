import { FastifyInstance } from 'fastify'
import { User } from '../interfaces/user-interface'
import { prisma } from '../database'

export default async function login(app: FastifyInstance) {
  app.addHook('onRequest', async (request) => {
    console.log(request.method, request.url)
  })
  app.post('/', async (request, reply) => {
    try {
      const user = request.body as User
      const isValidUser = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      })
      if (isValidUser) {
        if (isValidUser.password === user.password) {
          const token = app.jwt.sign(
            { user },
            {
              expiresIn: '1h',
            }
          )
          reply.setCookie(
            'sessionId',
            isValidUser.sessionId ? isValidUser.sessionId : ''
          )
          reply.status(200).send({ token })
        } else {
          reply.status(401).send({ msg: 'Unauthorized' })
        }
      } else {
        reply.status(401).send({ msg: 'Unauthorized' })
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
  })
}
