export interface PagiantionResponse<T> {
	info: {
		count: number
		pages: number
		next: string | null
		prev: string | null
	}
	results: T[]
}
