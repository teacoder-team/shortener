import Fastify from 'fastify'
import sensible from '@fastify/sensible'

import { registerPrisma } from './plugins/prisma.plugin'
import { registerRequestContext } from './plugins/request-context.plugin'
import { linksRoutes } from './modules/links/links.routes'
import { redirectRoutes } from './modules/redirect/redirect.routes'

export function buildApp() {
	const app = Fastify({
		logger: true,
		trustProxy: Number(process.env.TRUST_PROXY ?? 0),
	})

	app.register(sensible)
	app.register(registerRequestContext)
	app.register(registerPrisma)

	app.register(linksRoutes, { prefix: '/api/links' })
	app.register(redirectRoutes)

	return app
}
