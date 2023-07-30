import {useRef,ReactNode } from 'react'
import './dropdown.scss'

const clickOutsideRef = (content_ref: any, toggle_ref: any) => {
	document.addEventListener('mousedown', (e) => {
		//user click toggle
		if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
			content_ref.current.classList.toggle('active')
		} else {
			//user click outside toggle and content
			if (toggle_ref.current && !toggle_ref.current.contains(e.target)) {
				content_ref.current.classList.remove('active')
			}
		}
	})
}

type Props = {
	icon?: string
	badge?: string
	contentData: any
	renderItems: (item:any,idx:number) => ReactNode
	renderFooter?: () => ReactNode
	customToggle?: () => ReactNode
}

function Dropdown({icon, badge, contentData, renderFooter, renderItems, customToggle}: Props) {
	const dropdown_content_el = useRef(null)
	const dropdown_toggle_el = useRef(null)
	clickOutsideRef(dropdown_content_el, dropdown_toggle_el)
	return (
		<div className='dropdown'>
			<button ref={dropdown_toggle_el} className='dropdown__toggle'>
				{icon ? <i className={icon}></i> : ''}
				{badge ? <span className='dropdown__toggle-badge'>{badge}</span> : ''}
				{customToggle ? customToggle() : ''}
			</button>
			<div ref={dropdown_content_el} className='dropdown__content'>
				{contentData && renderItems
					? contentData.map((item: any, idx: number) => {
							return renderItems(item, idx)
					  })
					: ''}
				{renderFooter ? <div className='dropdown__footer'>{renderFooter()}</div> : ''}
			</div>
		</div>
	)
}

Dropdown.propTypes = {}

export default Dropdown
