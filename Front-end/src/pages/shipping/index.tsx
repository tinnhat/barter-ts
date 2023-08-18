import React, {useContext, useEffect, useState} from 'react'
import './style.scss'
import {useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import {saveDataFromLocalStorage} from '../../utils'
import {Helmet} from 'react-helmet-async'
import {Input, Button, Textarea} from '@chakra-ui/react'
import {Toaster, toast} from 'react-hot-toast'
type Props = {}

export default function Shipping({}: Props) {
	const navigate = useNavigate()
	const {state, dispatch} = useContext(Store)
	const {
		userInfo,
		cart: {shippingAddress},
	} = state
	const [fullName, setFullName] = useState(shippingAddress.fullName || '')
	const [address, setAddress] = useState(shippingAddress.address || '')
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
	const [note, setNote] = useState(shippingAddress.note || '')
	useEffect(() => {
		if (!userInfo?._id) {
			navigate('/signin?redirect=/shipping')
		}
	}, [userInfo])

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (!fullName) {
			toast.error('Please enter your full name')
      return
		}
		if (!address) {
			toast.error('Please enter your address')
      return
		}
    if (!postalCode) {
			toast.error('Please enter your postal code')
      return
		}
		dispatch({
		  type: 'SAVE_SHIPPING_ADDRESS',
		  payload: {
		    fullName,
		    address,
		    postalCode,
		    note,
		  },
		})
		saveDataFromLocalStorage('shippingAddress', {
		  fullName,
		  address,
		  postalCode,
		  note,
		})
		navigate('/payment')
	}

	return (
		<>
			<Toaster position='bottom-right' reverseOrder={false} />
			<Helmet>
				<title>Shipping Adress</title>
			</Helmet>
			<section className='shipping'>
				<div className='container'>
					<div className='shipping-container'>
						<h1 className='title'>Shipping Address</h1>
						<form onSubmit={handleSubmit}>
							<label htmlFor='name' className='label'>
								Full Name
							</label>
							<Input type='text' id='name' onChange={(e) => setFullName(e.target.value)} defaultValue={fullName} />
							<br />
							<label htmlFor='address' className='label'>
								Address
							</label>
							<Input type='text' id='address' onChange={(e) => setAddress(e.target.value)} defaultValue={address} />
							<br />
							<label htmlFor='postal' className='label'>
								Postal Code
							</label>
							<Input type='text' id='postal' onChange={(e) => setPostalCode(e.target.value)} defaultValue={postalCode} />
							<br />
							<label htmlFor='note' className='label'>
								Note
							</label>
							<Textarea name='' id='note' rows={4} onChange={(e) => setNote(e.target.value)} defaultValue={note}></Textarea>
							<br />
							<div className='btn-box'>
								<Button type='submit' className='btn-continue'>
									Continue
								</Button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}
