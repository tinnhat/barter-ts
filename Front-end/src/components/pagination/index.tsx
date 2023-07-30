import React from 'react'
import {DOTS, usePagination} from '../../hooks/usePagination'
import './style.scss'
type Props = {
	onPageChange: (a: number) => void
	totalCount: number
	siblingCount: number
	currentPage: number
	pageSize: number
}

const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize}: Props) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})!

	if (currentPage === 0 || paginationRange.length < 2) {
		return null
	}
	let lastPage = paginationRange[paginationRange.length - 1]

	const onNext = () => {
		if (!(currentPage === lastPage)) {
			onPageChange(currentPage + 1)
		}
	}

	const onPrevious = () => {
		if (!(currentPage === 1)) {
			onPageChange(currentPage - 1)
		}
	}

	return (
		<ul className='pagination-row'>
			<li className='pagination-arrow-left' onClick={onPrevious}>
				<i className={`fa-solid fa-chevron-left ${currentPage === 1 ? 'disabled' : ''}`}></i>
			</li>
			{paginationRange.map((pageNumber, idx) => {
				if (pageNumber === DOTS) {
					return (
						<li className='pagination-item-dots' key={idx}>
							.....
						</li>
					)
				}
				return (
					<li className={`pagination-item ${pageNumber === currentPage ? 'active' : ''}`} key={idx} onClick={() => onPageChange(Number(pageNumber))}>
						{pageNumber}
					</li>
				)
			})}
			<li className='pagination-arrow-right' onClick={onNext}>
				<i className={`fa-solid fa-chevron-right ${currentPage === lastPage ? 'disabled' : ''}`}></i>
			</li>
		</ul>
	)
}

export default React.memo(Pagination)
