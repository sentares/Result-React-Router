export const generateToken = (email: string): string => {
	const payload = {
		email,
		time: Date.now(),
	}
	return btoa(JSON.stringify(payload))
}
