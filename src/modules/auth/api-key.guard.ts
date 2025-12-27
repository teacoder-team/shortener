import type { FastifyRequest, FastifyReply } from 'fastify'
import { env } from '../../config/env'

export async function apiKeyGuard(req: FastifyRequest, reply: FastifyReply) {
	const key = req.headers['x-api-key']

	if (!key || key !== env.apiKey) return reply.unauthorized()
}
