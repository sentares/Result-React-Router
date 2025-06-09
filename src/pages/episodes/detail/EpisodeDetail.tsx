import { internalPaths } from '@/app/router'
import { Episodes, type Episode } from '@/data'
import { Link, useParams } from 'react-router-dom'
import styles from './EpisodeDetail.module.scss'

const getEpisodeById = (id: string | undefined): Episode | undefined => {
	if (!id) return undefined
	return Episodes.find(ep => String(ep.id) === id)
}

export default function EpisodeDetail() {
	const { id } = useParams<{ id: string }>()
	const episode = getEpisodeById(id)

	if (!episode) {
		return (
			<div>
				<h2>Episode not found</h2>
				<Link to={internalPaths.episodes.list}>← Back to episodes list</Link>
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
