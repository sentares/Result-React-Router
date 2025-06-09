import { internalPaths } from '@/app/router'
import { Locations, type Location } from '@/data'
import { Link, useParams } from 'react-router-dom'
import styles from './LocationDetail.module.scss'

const getLocationById = (id: string | undefined): Location | undefined => {
	if (!id) return undefined
	return Locations.find(location => String(location.id) === id)
}

export default function LocationDetail() {
	const { id } = useParams<{ id: string }>()
	const location: Location | undefined = getLocationById(id)

	if (!location) {
		return (
			<div>
				<h2>Location not found</h2>
				<Link to={internalPaths.locations.list}>← Back to list</Link>
			</div>
		)
	}

	return (
		<div>
			<Link to={internalPaths.locations.list}>← Back to list</Link>

			<div className={styles.mainBlock}>
				<h1>{location.name}</h1>
			</div>

			<div>
				<p>ID: {location.id}</p>
				<p>
					<strong>Type:</strong> {location.type}
				</p>
				<p>
					<strong>Dimension:</strong> {location.dimension}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(location.created).toLocaleDateString()}
				</p>
			</div>
		</div>
	)
}
