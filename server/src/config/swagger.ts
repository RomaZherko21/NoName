import swaggerJsdoc from 'swagger-jsdoc'

const { SERVER_PROTOCOL } = process.env

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NoName API',
    version: '1.0.0',
    description: 'NoName API made with NodeJs/Express and documented with Swagger',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: SERVER_PROTOCOL,
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./**/*.ts'],
}

const specs = swaggerJsdoc(options)

export { specs }
