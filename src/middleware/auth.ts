import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export default async function auth(app: FastifyInstance) {
  app.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    }
  )
}
