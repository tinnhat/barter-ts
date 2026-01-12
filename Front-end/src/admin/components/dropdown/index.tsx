import { ReactNode } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button, Badge, Box } from '@chakra-ui/react'
import './dropdown.scss'

type Props = {
	icon?: string
	badge?: string
	contentData: any
	renderItems: (item: any, idx: number) => ReactNode
	renderFooter?: () => ReactNode
	customToggle?: () => ReactNode
}

function Dropdown({ icon, badge, contentData, renderFooter, renderItems, customToggle }: Props) {
	return (
		<Menu>
			<MenuButton as={Button} variant="ghost">
				{customToggle ? (
					customToggle()
				) : (
					<>
						{icon ? <i className={icon}></i> : null}
						{badge ? <Badge ml={2}>{badge}</Badge> : null}
					</>
				)}
			</MenuButton>
			<MenuList>
				{contentData && renderItems
					? contentData.map((item: any, idx: number) => <MenuItem key={idx}>{renderItems(item, idx)}</MenuItem>)
					: null}
				{renderFooter ? <Box px={3} py={2}>{renderFooter()}</Box> : null}
			</MenuList>
		</Menu>
	)
}

export default Dropdown
