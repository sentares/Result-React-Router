import { internalPaths } from '@/app/router'
import { Characters, type Character } from '@/data'
import { Link, useParams } from 'react-router-dom'
import styles from './CharacterDetail.module.scss'

export function CharacterDetail() {
	const { id } = useParams<{ id: string }>()
	const character: Character | undefined = Characters.find(
		char => String(char.id) === id
	)

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
