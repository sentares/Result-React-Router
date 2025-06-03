export const internalPaths = {
	home: '/',
	characters: {
		list: '/characters',
		detail: (id: string) => `/characters/${id}`,
	},
	locations: {
		list: '/locations',
		detail: (id: string) => `/locations/${id}`,
	},
	episodes: {
		list: '/episodes',
		detail: (id: string) => `/episodes/${id}`,
	},
} as const
