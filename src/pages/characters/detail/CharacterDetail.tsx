import { internalPaths } from '@/app/providers/router'
import { useGetDetailCharacter } from '@/core/hooks/api/characters'
import { Link, useParams } from 'react-router-dom'
import styles from './CharacterDetail.module.scss'

export default function CharacterDetail() {
	const { id } = useParams<{ id: string }>()

	const { error, loading, character } = useGetDetailCharacter(id ?? '')

	if (loading) return <div>Loading...</div>
	if (error || !character) return <div>Error loading character</div>

	if (!character) {
		return (
			<div>
				<h2>Character not found</h2>
				<Link to={internalPaths.characters.list}>← Back to list</Link>
			</div>
		)
	}

	return (
		<div>
			<Link to={internalPaths.characters.list}>← Back to list</Link>

			<div className={styles.mainBlock}>
				<h1>{character.name}</h1>
				<img src={character.image} alt={character.name} />
			</div>

			<div>
				<p>ID: {character.id}</p>
				<p>
					<strong>Status:</strong> {character.status}
				</p>
				<p>
					<strong>Species:</strong> {character.species}
				</p>
				{character.type && (
					<p>
						<strong>Type:</strong> {character.type}
					</p>
				)}
				<p>
					<strong>Gender:</strong> {character.gender}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(character.created).toLocaleDateString()}
				</p>
			</div>
		</div>
	)
}
