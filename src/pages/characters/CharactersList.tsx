import { internalPaths } from '@/app/providers/router'
import { getCategoryFromPath } from '@/core/helpers/category'
import { useDebounce } from '@/core/hooks'
import { useGetCharacters } from '@/core/hooks/api/characters'
import { type Character } from '@/data'
import { Input } from '@mantine/core'
import { useCallback, useRef, useState, type ChangeEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CharactersList.module.scss'

// const Input = getDynamicComponent('Input')

export default function CharactersList() {
	const { pathname } = useLocation()
	const category = getCategoryFromPath(pathname)

	const observer = useRef<IntersectionObserver>(null)

	const [pageNumber, setPageNumber] = useState(1)
	const [inputSearch, setInputSearch] = useState('')
	const [queryParams, setQueryParams] = useState({
		search: '',
	})

	const { loading, error, characters, hasMore, notFound } = useGetCharacters(
		queryParams,
		pageNumber
	)

	const lastCharacterRef = useCallback(
		(node: HTMLLIElement) => {
			if (loading) return
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber(prevPageNumber => prevPageNumber + 1)
				}
			})

			if (node) observer.current.observe(node)
		},
		[loading, hasMore]
	)

	useDebounce(
		() => {
			setQueryParams(prev => {
				if (prev.search === inputSearch) return prev
				setPageNumber(1)
				return { ...prev, search: inputSearch }
			})
		},
		500,
		[inputSearch]
	)

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setInputSearch(event.target.value)
	}

	return (
		<div>
			<div className={styles.filterBar}>
				<h1 className='category'>{category.toUpperCase()}</h1>
				<Input onChange={handleChangeInput} />
			</div>

			<ul>
				{characters.map((item: Character, index) => (
					<li
						key={item.id}
						ref={index === characters.length - 5 ? lastCharacterRef : null}
					>
						<Link to={internalPaths.characters.detail(String(item.id))}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>

			{loading && <div>Loading more characters...</div>}
			{error && <div>Error loading characters</div>}
			{notFound && !loading && <div>No characters found for your search.</div>}
			{!hasMore && !loading && !error && !notFound && (
				<div>No more characters to load</div>
			)}
		</div>
	)
}
