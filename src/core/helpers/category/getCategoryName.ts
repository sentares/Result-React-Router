export function getCategoryFromPath(pathname: string): string {
	return pathname.split('/').filter(Boolean)[0] || 'unknown'
}
