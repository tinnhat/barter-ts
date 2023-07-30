import { Link } from 'react-router-dom'
import notification from '../../assets/JsonData/notification.json'
import user_menu from '../../assets/JsonData/user_menus.json'
import Dropdown from '../dropdown'
import './topnav.scss'
import { getDataFromLocalStorage } from '../../../utils'


const renderNotificationItem = (item:any, index:number) => {
	return (
		<div className='notification-item' key={index}>
			<i className={item.icon}></i>
			<span>{item.content}</span>
		</div>
	)
}

const renderUserToggle = (name:string) => {
	return (
		<div className='topnav__right-user'>
			<div className='topnav__right-user-name'>Hello, {name}</div>
		</div>
	)
}
const renderUserMenu = (item:any, index:number) => {
	return (
		<Link to={'/'} key={index}>
			<div className='notification-item'>
				<i className={item.icon}></i>
				<span>{item.content}</span>
			</div>
		</Link>
	)
}
function Topnav() {
  const adminInfo = getDataFromLocalStorage('userInfo')
	return (
		<div className='topnav'>
			<div className='topnav__search'>
				<input type='text' placeholder='search here...' />
				<i className='bx bx-search'></i>
			</div>
			<div className='topnav__right'>
				<div className='topnav__right-item'>
					{/* dropdown */}
					<Dropdown customToggle={() => renderUserToggle(adminInfo.name)} contentData={user_menu} renderItems={(item:any, idx:number) => renderUserMenu(item, idx)} />
				</div>
				<div className='topnav__right-item'>
					{/* dropdown */}
					<Dropdown icon='bx bx-bell' badge='12' contentData={notification} renderItems={(item:any, idx:number) => renderNotificationItem(item, idx)} renderFooter={() => <Link to={'/'}>View All</Link>} />
				</div>
			</div>
		</div>
	)
}

Topnav.propTypes = {}

export default Topnav
