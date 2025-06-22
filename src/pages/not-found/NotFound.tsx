import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

export default function NotFound() {
	return (
		<div className={styles.notFound}>
			<h1>404 - Page Not Found</h1>
			<p>The page you're looking for doesn't exist.</p>
			<Link to='/'>← Back to Home</Link>
		</div>
	)
}
