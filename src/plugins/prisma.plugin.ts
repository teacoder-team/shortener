import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/generated/client'
import fp from 'fastify-plugin'

import * as dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME,
})

export const prisma = new PrismaClient({ adapter })

export const registerPrisma = fp(async (app) => {
	await prisma.$connect()

	app.decorate('prisma', prisma)

	app.addHook('onClose', async () => {
		await prisma.$disconnect()
	})
})

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient
	}
}
