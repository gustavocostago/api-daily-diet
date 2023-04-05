import { FastifyReply, FastifyRequest } from 'fastify'

export default async function auth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  async () => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  }
}
