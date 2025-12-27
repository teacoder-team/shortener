import { LinksRepository } from './links.repository'
import { CreateLinkDto } from './links.dto'
import { nanoid } from '../../common/utils/nanoid'
import { normalizeUrl } from '../../common/utils/url'

export class LinksService {
	public constructor(private repository: LinksRepository) {}

	public async create(dto: CreateLinkDto) {
		const slug = dto.slug ?? nanoid()
		const url = normalizeUrl(dto.url)

		return this.repository.create({
			slug,
			originalUrl: url,
			name: dto.name,
		})
	}
}
