import fp from 'fastify-plugin'
import { randomUUID } from 'crypto'

export const registerRequestContext = fp(async (app) => {
	app.addHook('onRequest', async (req) => {
		req.requestId = randomUUID()
	})
})

declare module 'fastify' {
	interface FastifyRequest {
		requestId: string
	}
}
