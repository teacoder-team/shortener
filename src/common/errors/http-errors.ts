import { AppError } from './app-error'

export const Unauthorized = () => new AppError('Unauthorized', 401)
export const NotFound = () => new AppError('Not found', 404)
export const BadRequest = (msg = 'Bad request') => new AppError(msg, 400)
