import { internalPaths } from '@/app/providers/router'
import { useGetDetailLocation } from '@/core/hooks/api/locations'
import { Link, useParams } from 'react-router-dom'
import styles from './LocationDetail.module.scss'

export default function LocationDetail() {
	const { id } = useParams<{ id: string }>()

	const { error, loading, location } = useGetDetailLocation(id ?? '')

	if (loading) return <div>Loading...</div>
	if (error || !location) return <div>Error loading location</div>

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
