import { FastifyRequest, FastifyReply } from 'fastify'
import { RedirectService } from './redirect.service'
import { RedirectRepository } from './redirect.repository'
import { getClientIp } from '../../common/utils/ip'

export async function redirectController(
	req: FastifyRequest,
	reply: FastifyReply
) {
	const { slug } = req.params as any

	const service = new RedirectService(
		new RedirectRepository(req.server.prisma)
	)

	const url = await service.redirect(slug, {
		ip: getClientIp(req),
		userAgent: req.headers['user-agent'],
		referer: req.headers.referer,
		acceptLanguage: req.headers['accept-language'],
	})

	if (!url) {
		return reply.notFound()
	}

	return reply.redirect(url)
}
