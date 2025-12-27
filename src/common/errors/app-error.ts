export class AppError extends Error {
	public constructor(
		public override message: string,
		public statusCode = 500
	) {
		super(message)
	}
}
