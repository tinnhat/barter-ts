import { useOutsideClick } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { getDataFromLocalStorage } from '../../../utils'
import './topnav.scss'

function Topnav() {
	const adminInfo = getDataFromLocalStorage('userInfo')
	const ref: any = useRef()
	const [isModalOpen, setIsModalOpen] = useState(false)
	useOutsideClick({
		ref: ref,
		handler: () => setIsModalOpen(false),
	})
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/admin/signin'
  }

	return (
		<div className='topnav'>
			<div className='topnav__search'></div>
			<div className='topnav__right'>
				<p className='topnav__right-user-name' onClick={() => setIsModalOpen(true)}>
					Welcome, {adminInfo.name}
				</p>
				{isModalOpen ? (
					<ul className='topnav-menu' ref={ref}>
						<li className='topnav-menu__item' onClick={() => (window.location.href = '/')}>
							Homepage
						</li>
						<li className='topnav-menu__item' onClick={handleLogout}>Logout</li>
					</ul>
				) : null}
			</div>
		</div>
	)
}

Topnav.propTypes = {}

export default Topnav
