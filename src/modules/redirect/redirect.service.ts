import { RedirectRepository } from './redirect.repository'

export class RedirectService {
	public constructor(private repository: RedirectRepository) {}

	public async redirect(slug: string, meta: any) {
		const link = await this.repository.find(slug)

		if (!link) return 'https://teacoder.ru'

		await this.repository.create({
			linkId: link.id,
			...meta,
		})

		return link.originalUrl
	}
}
