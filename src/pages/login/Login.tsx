import { useAuth } from '@/app/context'
import { getDynamicComponent } from '@/components/common/dynamic'
import { generateToken } from '@/core/helpers/token'
import { isEmail, minLength } from '@/core/helpers/validate'
import { useRedirectFrom } from '@/core/hooks'
import { IconAt, IconEye, IconEyeOff, IconLock } from '@tabler/icons-react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

export interface LoginOptions {
	email: string
	password: string
}

const Input = getDynamicComponent('Input')
const Button = getDynamicComponent('Button')

export default function Login() {
	const navigate = useNavigate()
	const formRef = useRef<HTMLFormElement>(null)

	const from = useRedirectFrom()
	const { login } = useAuth()

	const [inputs, setInputs] = useState<LoginOptions>({
		email: '',
		password: '',
	})
	const [errors, setErrors] = useState<Partial<LoginOptions>>({})
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
		const target = event.target as HTMLElement

		if (target instanceof HTMLInputElement && target.name) {
			setInputs(prev => ({
				...prev,
				[target.name]: target.value,
			}))

			setErrors(prev => ({
				...prev,
				[target.name]: '',
			}))
		}
	}

	const validate = () => {
		const newErrors: Partial<LoginOptions> = {
			email: isEmail(inputs.email),
			password: minLength(inputs.password, 6),
		}

		setErrors(newErrors)

		return !Object.values(newErrors).some(Boolean)
	}

	const handleReset = () => {
		setInputs({ email: '', password: '' })
		setErrors({})
	}

	const togglePasswordVisibility = () => setShowPassword(prev => !prev)

	const onSubmit = (inputs: LoginOptions) => {
		const token = generateToken(inputs.email)
		login(token)
		navigate(from, { replace: true })
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (!validate()) return

		formRef.current?.reset()
		onSubmit(inputs)
	}

	return (
		<div className={styles.Page}>
			<div className={styles.Login}>
				<form
					className={styles.LoginForm}
					ref={formRef}
					onSubmit={handleSubmit}
					onChange={handleChange}
					onReset={handleReset}
				>
					<Input
						withAsterisk
						label='Введите почту'
						description='Обязательно заполните поле'
						name='email'
						type='email'
						leftSection={<IconAt size={16} />}
						placeholder='Введите email'
						required
						error={errors.email}
					/>

					<Input
						withAsterisk
						label='Введите пароль'
						description='Обязательно заполните поле'
						name='password'
						type={showPassword ? 'text' : 'password'}
						leftSection={<IconLock size={16} />}
						rightSection={
							showPassword ? (
								<IconEyeOff size={16} onClick={togglePasswordVisibility} />
							) : (
								<IconEye size={16} onClick={togglePasswordVisibility} />
							)
						}
						placeholder='Введите пароль'
						required
						error={errors.password}
					/>

					<Button type='submit' variant='BACKGROUND'>
						Войти
					</Button>
				</form>
			</div>
		</div>
	)
}
