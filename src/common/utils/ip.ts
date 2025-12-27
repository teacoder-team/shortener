import type { FastifyRequest } from 'fastify'

export function getClientIp(req: FastifyRequest): string {
	try {
		const headers = req.headers

		const headerCandidates = [
			headers['cf-connecting-ip'],
			headers['x-real-ip'],
			headers['x-client-ip'],
			headers['fastly-client-ip'],
			headers['true-client-ip'],
			headers['x-forwarded-for'],
			headers['x-forwarded'],
			headers['forwarded'],
			headers['via'],
		]

		for (const header of headerCandidates) {
			if (!header) continue

			let value = Array.isArray(header) ? header[0] : header
			if (!value) continue

			if (value.includes(',')) {
				value = value.split(',')[0]!.trim()
			}

			const forwardedMatch = /for="?([^";]+)"?/i.exec(value)
			if (forwardedMatch) {
				return normalizeIp(forwardedMatch[1]!)
			}

			return normalizeIp(value)
		}

		if (req.ip) {
			return normalizeIp(req.ip)
		}

		if (req.socket?.remoteAddress) {
			return normalizeIp(req.socket.remoteAddress)
		}

		return '0.0.0.0'
	} catch (e) {
		return '0.0.0.0'
	}
}

function normalizeIp(ip: string): string {
	if (!ip) return '0.0.0.0'

	if (ip.startsWith('::ffff:')) {
		ip = ip.replace('::ffff:', '')
	}

	if (ip.includes(':') && ip.includes('.')) {
		ip = ip
			.split(':')
			.filter((part) => /^\d+$/.test(part) === false)
			.join('')
	}

	return ip.trim()
}
