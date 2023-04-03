import Fastify from 'fastify'
import cookies from '@fastify/cookie'

import users from './routes/users'
import meals from './routes/meals'

export const app = Fastify({
  logger: false,
})

app.register(cookies)

app.register(users, {
  prefix: 'users',
})

app.register(meals, {
  prefix: 'meals',
})
