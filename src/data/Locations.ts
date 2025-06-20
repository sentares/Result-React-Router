export type LocationType =
	| 'Planet'
	| 'Cluster'
	| 'Space station'
	| 'Microverse'
	| 'TV'
	| 'Resort'
	| 'Fantasy town'
	| 'Dream'

export type LocationDimension =
	| 'Dimension C-137'
	| 'unknown'
	| 'Post-Apocalyptic Dimension'
	| 'Replacement Dimension'
	| 'Cronenberg Dimension'
	| 'Fantasy Dimension'
	| 'Dimension 5-126'

export interface Location {
	id: number
	name: string
	type: LocationType
	dimension: LocationDimension
	created: string
}

export const Locations: Location[] = [
	{
		id: 1,
		name: 'Earth (C-137)',
		type: 'Planet',
		dimension: 'Dimension C-137',
		created: '2017-11-10T12:42:04.162Z',
	},
	{
		id: 2,
		name: 'Abadango',
		type: 'Cluster',
		dimension: 'unknown',
		created: '2017-11-10T13:06:38.182Z',
	},
	{
		id: 3,
		name: 'Citadel of Ricks',
		type: 'Space station',
		dimension: 'unknown',
		created: '2017-11-10T13:08:13.191Z',
	},
	{
		id: 4,
		name: "Worldender's lair",
		type: 'Planet',
		dimension: 'unknown',
		created: '2017-11-10T13:08:20.569Z',
	},
	{
		id: 5,
		name: 'Anatomy Park',
		type: 'Microverse',
		dimension: 'Dimension C-137',
		created: '2017-11-10T13:08:46.060Z',
	},
	{
		id: 6,
		name: 'Interdimensional Cable',
		type: 'TV',
		dimension: 'unknown',
		created: '2017-11-10T13:09:09.102Z',
	},
	{
		id: 7,
		name: 'Immortality Field Resort',
		type: 'Resort',
		dimension: 'unknown',
		created: '2017-11-10T13:09:17.136Z',
	},
	{
		id: 8,
		name: 'Post-Apocalyptic Earth',
		type: 'Planet',
		dimension: 'Post-Apocalyptic Dimension',
		created: '2017-11-10T13:09:22.551Z',
	},
	{
		id: 9,
		name: 'Purge Planet',
		type: 'Planet',
		dimension: 'Replacement Dimension',
		created: '2017-11-10T13:09:29.566Z',
	},
	{
		id: 10,
		name: 'Venzenulon 7',
		type: 'Planet',
		dimension: 'unknown',
		created: '2017-11-18T11:21:51.643Z',
	},
	{
		id: 11,
		name: 'Bepis 9',
		type: 'Planet',
		dimension: 'unknown',
		created: '2017-11-18T11:26:03.325Z',
	},
	{
		id: 12,
		name: 'Cronenberg Earth',
		type: 'Planet',
		dimension: 'Cronenberg Dimension',
		created: '2017-11-18T11:29:27.857Z',
	},
	{
		id: 13,
		name: 'Nuptia 4',
		type: 'Planet',
		dimension: 'unknown',
		created: '2017-11-18T11:30:29.780Z',
	},
	{
		id: 14,
		name: "Giant's Town",
		type: 'Fantasy town',
		dimension: 'Fantasy Dimension',
		created: '2017-11-18T11:31:15.248Z',
	},
	{
		id: 15,
		name: 'Bird World',
		type: 'Planet',
		dimension: 'unknown',
		created: '2017-11-18T11:32:26.752Z',
	},
	{
		id: 16,
		name: 'St. Gloopy Noops Hospital',
		type: 'Space station',
		dimension: 'unknown',
		created: '2017-11-18T11:43:20.075Z',
	},
	{
		id: 17,
		name: 'Earth (5-126)',
		type: 'Planet',
		dimension: 'Dimension 5-126',
		created: '2017-11-18T11:41:08.486Z',
	},
	{
		id: 18,
		name: "Mr. Goldenfold's dream",
		type: 'Dream',
		dimension: 'Dimension C-137',
		created: '2017-11-18T11:46:22.933Z',
	},
	{
		id: 19,
		name: 'Gromflom Prime',
		type: 'Planet',
		dimension: 'Replacement Dimension',
		created: '2017-11-18T11:39:52.165Z',
	},
	{
		id: 20,
		name: 'Earth (Replacement Dimension)',
		type: 'Planet',
		dimension: 'Replacement Dimension',
		created: '2017-11-18T19:33:01.173Z',
	},
]
