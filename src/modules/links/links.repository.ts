import { PrismaClient } from '@prisma/generated/client'
import type { LinkCreateInput } from '@prisma/generated/models'

export class LinksRepository {
	public constructor(private prisma: PrismaClient) {}

	public find(slug: string) {
		return this.prisma.link.findUnique({
			where: {
				slug,
			},
		})
	}

	public create(data: LinkCreateInput) {
		return this.prisma.link.create({
			data,
		})
	}
}
