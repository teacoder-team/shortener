import { FastifyRequest } from 'fastify'
import { LinksService } from './links.service'
import { LinksRepository } from './links.repository'

export async function createLinkController(req: FastifyRequest) {
	const service = new LinksService(new LinksRepository(req.server.prisma))

	return service.create(req.body as any)
}
