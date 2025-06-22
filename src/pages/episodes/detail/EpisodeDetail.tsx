import { internalPaths } from '@/app/router'
import { useGetDetailEpisode } from '@/core/hooks/api/episodes'
import { Link, useParams } from 'react-router-dom'
import styles from './EpisodeDetail.module.scss'

export default function EpisodeDetail() {
	const { id } = useParams<{ id: string }>()

	const { error, loading, episode } = useGetDetailEpisode(id ?? '')

	if (loading) return <div>Loading...</div>
	if (error || !episode) return <div>Error loading episode</div>

	if (!episode) {
		return (
			<div>
				<h2>Episode not found</h2>
				<Link to={internalPaths.episodes.list}>← Back to list</Link>
			</div>
		)
	}

	return (
		<div>
			<Link to={internalPaths.episodes.list}>← Back to episodes list</Link>

			<div className={styles.mainBlock}>
				<h1>{episode.name}</h1>
				<div>{episode.episode}</div>
			</div>

			<div>
				<div>
					<strong>Air Date:</strong> {episode.air_date}
				</div>
				<div>
					<strong>Created:</strong>{' '}
					{new Date(episode.created).toLocaleDateString()}
				</div>
				<div>
					<strong>ID:</strong> {episode.id}
				</div>
			</div>
		</div>
	)
}
