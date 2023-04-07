import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookies from '@fastify/cookie'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'

import users from './routes/users'
import meals from './routes/meals'
import login from './routes/login'

export const app = Fastify({
  logger: false,
})

app.register(fastifyCors, {
  origin: '*',
})
app.register(fastifyCookies)
app.register(fastifySwagger)
app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

app.register(fastifyJwt, {
  secret: 'supersecret',
})

app.register(login, {
  prefix: 'login',
})

app.register(users, {
  prefix: 'users',
})

app.register(meals, {
  prefix: 'meals',
})
