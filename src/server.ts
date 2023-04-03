import { app } from './app'

app.listen(
  {
    port: 8888,
  },
  (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log('SERVIDOR ONLINE')
  }
)
