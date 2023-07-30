import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import './sidebar.scss'
import {Helmet} from 'react-helmet-async'
type Props = {
	icon: string
	title: string
	active: boolean
	handleClick: () => void
}
const SidebarItems = (props: Props) => {
	const active = props.active ? 'active' : ''
	return (
		<div className='sidebar__item' onClick={() => props.handleClick()}>
			<div className={`sidebar__item-inner ${active}`}>
				<i className={props.icon}></i>
				<span>{props.title}</span>
			</div>
		</div>
	)
}
function Sidebar() {
	const [activeItem, setActiveItem] = useState(0)
	const path = window.location.pathname
	useEffect(() => {
		if (path === '/admin' || path === '/admin/') {
			setActiveItem(0)
		} else {
			const result = sidebar_items.findIndex((item) => item.route === path)
			setActiveItem(result)
		}
	}, [])
	const handleClick = (id: number) => {
		setActiveItem(id)
	}
	return (
		<>
			<Helmet>
				<title>Admin</title>
			</Helmet>
			<div className='sidebar'>
				<div className='sidebar__logo'>
					<p className='sidebar__logo-text'>Barter</p>
				</div>
				{sidebar_items.map((item, idx) => {
					return (
						<Link to={item.route} key={idx}>
							<SidebarItems title={item.display_name} icon={item.icon} active={idx === activeItem} handleClick={() => handleClick(idx)} />
						</Link>
					)
				})}
			</div>
		</>
	)
}

Sidebar.propTypes = {}

export default Sidebar
