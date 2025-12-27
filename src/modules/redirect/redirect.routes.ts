import { FastifyInstance } from 'fastify'
import { redirectController } from './redirect.controller'

export async function redirectRoutes(app: FastifyInstance) {
	app.get('/:slug', redirectController)
}
