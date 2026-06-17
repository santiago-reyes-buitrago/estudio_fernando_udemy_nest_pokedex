export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT!, 10) || 3000,
  mongoUrl: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
})