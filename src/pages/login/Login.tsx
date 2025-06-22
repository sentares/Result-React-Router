import { useAuth } from '@/app/providers/context'
import { generateToken } from '@/core/helpers/token'
import { useRedirectFrom } from '@/core/hooks'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

// const Button = getDynamicComponent('Button')
// const TextInput = getDynamicComponent('TextInput')
// const PasswordInput = getDynamicComponent('PasswordInput')

export default function Login() {
	const navigate = useNavigate()
	const from = useRedirectFrom()
	const { login } = useAuth()

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: value =>
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
					? null
					: 'Введите корректный email',
			password: value =>
				value.length >= 6 ? null : 'Пароль должен быть не менее 6 символов',
		},
	})

	const onSubmit = () => {
		const token = generateToken(form.values.email)
		login(token)
		navigate(from, { replace: true })
	}

	return (
		<div className={styles.Page}>
			<div className={styles.Login}>
				<form className={styles.LoginForm} onSubmit={form.onSubmit(onSubmit)}>
					<TextInput
						withAsterisk
						label='Введите почту'
						description='Обязательно заполните поле'
						type='email'
						leftSection={<IconAt size={16} />}
						placeholder='Введите email'
						required
						{...form.getInputProps('email')}
					/>

					<PasswordInput
						withAsterisk
						label='Введите пароль'
						description='Обязательно заполните поле'
						name='password'
						leftSection={<IconLock size={16} />}
						placeholder='Введите пароль'
						required
						{...form.getInputProps('password')}
					/>

					<Button type='submit'>Submit</Button>
				</form>
			</div>
		</div>
	)
}
