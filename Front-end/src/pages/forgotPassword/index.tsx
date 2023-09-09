import {Button, Input} from '@chakra-ui/react'
import {useRef} from 'react'
import './style.scss'
import {toast} from 'react-hot-toast'
import {useForgotPasswordMutation} from '../../hooks/userHooks'
import {ApiError} from '../../types/ApiError'
import {getError} from '../../utils'
type Props = {}

export default function ForgotPassword({}: Props) {
	const ref = useRef<HTMLInputElement>(null)
	const {mutateAsync: fotgotPassword, isLoading} = useForgotPasswordMutation()
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (!ref.current!.value) {
			toast.error('Email is required')
			return
		}
		try {
			if (ref.current?.value) {
				const data = await fotgotPassword({
					email: ref.current.value,
				})
				if (data) {
					toast.success('Please check your email to new password')
					ref.current.value = ''
				}
			}
		} catch (err: unknown) {
			toast.error(getError(err as ApiError))
		}
	}
	return (
		<section className='forgot'>
			<div className='banner'>
				<h1 className='banner-title'>Lost Password</h1>
			</div>
			<div className='container'>
				<div className='forgot-container'>
					<p className='forgot-title'>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
					<div className='forgot-box'>
						<form onSubmit={handleSubmit}>
							<p className='forgot-label'>Your email address</p>
							<Input required placeholder='Enter your email' type='email' className='input-email-forgot' ref={ref} />
							<br />
							<Button type='submit' className='btn-reset' isLoading={isLoading}>
								Reset password
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
