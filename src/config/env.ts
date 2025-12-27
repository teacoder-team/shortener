export const env = {
	nodeEnv: process.env.NODE_ENV ?? 'development',
	apiKey: process.env.API_KEY ?? '',
	baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
}
