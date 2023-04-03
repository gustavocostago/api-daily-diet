import Fastify from 'fastify'

import users from './routes/users'
import meals from './routes/meals'

export const app = Fastify({
  logger: false,
})

app.register(users, {
  prefix: 'users',
})

app.register(meals, {
  prefix: 'meals',
})
