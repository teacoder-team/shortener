import { FastifyInstance } from 'fastify'
import { createLinkController } from './links.controller'
import { apiKeyGuard } from '../auth/api-key.guard'

export async function linksRoutes(app: FastifyInstance) {
	app.post('/', { preHandler: apiKeyGuard }, createLinkController)
}
