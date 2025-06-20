import { internalPaths } from '@/app/router'
import { DynamicComponent } from '@/components/common/dynamic'
import { Input } from '@/components/ui/input'
import { getCategoryFromPath } from '@/core/helpers/category'
import { useGetCharacters, useSortParam } from '@/core/hooks'
import { type Character } from '@/data'
import {
	useCallback,
	useRef,
	useState,
	type ChangeEvent,
	type ComponentProps,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CharactersList.module.scss'

const Sorting = (
	props: Omit<ComponentProps<typeof DynamicComponent>, 'nameComponent'>
) => <DynamicComponent nameComponent='Sorting' {...props} />

// const Input = (
// 	props: Omit<ComponentProps<typeof DynamicComponent>, 'nameComponent'>
// ) => <DynamicComponent nameComponent='Input' {...props} />

export default function CharactersList() {
	const { pathname } = useLocation()
	const category = getCategoryFromPath(pathname)
	const sort = useSortParam()

	const [queryParams, setQueryParams] = useState({
		search: '',
		sort: '',
	})

	const [pageNumber, setPageNumber] = useState(1)
	const { loading, error, characters, hasMore, notFound } = useGetCharacters(
		queryParams,
		pageNumber
	)

	const observer = useRef<IntersectionObserver>(null)
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

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPageNumber(1)
		setQueryParams(prev => ({ ...prev, search: event.target.value }))
	}

	return (
		<div>
			<div className={styles.filterBar}>
				<h1 className='category'>{category.toUpperCase()}</h1>
				<Input onChange={handleChangeInput} />
				<Sorting />
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
