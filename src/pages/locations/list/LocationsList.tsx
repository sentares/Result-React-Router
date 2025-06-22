import { internalPaths } from '@/app/router'
import { getDynamicComponent } from '@/components/common/dynamic'
import { getCategoryFromPath } from '@/core/helpers/category'
import { useDebounce } from '@/core/hooks'
import { useGetlocations } from '@/core/hooks/api/locations'
import { type Location } from '@/data'
import { useCallback, useRef, useState, type ChangeEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './LocationList.module.scss'

const Input = getDynamicComponent('Input')

export default function LocationsList() {
	const { pathname } = useLocation()
	const category = getCategoryFromPath(pathname)

	const observer = useRef<IntersectionObserver>(null)

	const [pageNumber, setPageNumber] = useState(1)
	const [inputSearch, setInputSearch] = useState('')
	const [queryParams, setQueryParams] = useState({
		search: '',
	})

	const { locations, error, hasMore, loading, notFound } = useGetlocations(
		queryParams,
		pageNumber
	)

	const lastLocationRef = useCallback(
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
				{locations.map((item: Location, index) => (
					<li
						key={item.id}
						ref={index === locations.length - 5 ? lastLocationRef : null}
					>
						<Link to={internalPaths.locations.detail(String(item.id))}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>

			{loading && <div>Loading more locations...</div>}
			{error && <div>Error loading locations</div>}
			{notFound && !loading && <div>No locations found for your search.</div>}
			{!hasMore && !loading && !error && !notFound && (
				<div>No more locations to load</div>
			)}
		</div>
	)
}
