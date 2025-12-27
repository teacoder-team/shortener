import { PrismaClient } from '@prisma/generated/client'
import type { ClickCreateInput } from '@prisma/generated/models'

export class RedirectRepository {
	public constructor(private prisma: PrismaClient) {}

	public find(slug: string) {
		return this.prisma.link.findUnique({
			where: {
				slug,
			},
		})
	}

	public create(data: ClickCreateInput) {
		return this.prisma.click.create({
			data,
		})
	}
}
