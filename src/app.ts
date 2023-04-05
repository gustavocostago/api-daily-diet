import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cookies from '@fastify/cookie'

import users from './routes/users'
import meals from './routes/meals'
import login from './routes/login'

export const app = Fastify({
  logger: false,
})

app.register(cookies)
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
