import { randomBytes } from 'crypto'

export function randomString(length = 32) {
	return randomBytes(length).toString('hex')
}
