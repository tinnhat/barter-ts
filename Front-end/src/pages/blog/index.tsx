import { Button, Tooltip } from '@chakra-ui/react'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import apiClient from '../../apiClient'
import { useGetAllBlogs } from '../../hooks/blogHooks'
import { BlogType } from '../../types/Blog'
import { getDataFromLocalStorage } from '../../utils'
import ModalEditAddBlog from './modalAddEdit'

import './style.scss'
import { typeEnum } from '../../common/enum'
type Props = {}

export default function Blog({}: Props) {
	const [showModal, setShowModal] = useState({
		show: false,
		type: typeEnum.Add,
		blog: {
			author: '',
			content: '',
			user: '',
			title: '',
		},
	})
	const {data: blogs,refetch} = useGetAllBlogs()
	const userInfo = getDataFromLocalStorage('userInfo')
	const handleDeleteBlog = async (id: string) => {
		try {
			const result = await apiClient.delete(`api/blogs/${id}`)
			if (result) {
				toast.success('Delete Blog Successfully')
				handleRefetchData()
			}
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Unknown error.'
			toast.error(message)
			throw error
		}
	}
	const handleOpen = () => {
		setShowModal({
			show: true,
			type: typeEnum.Add,
			blog: {
				author: '',
				content: '',
				user: '',
				title: '',
			},
		})
	}
	const handleRefetchData = () => {
		refetch()
	}
	const handleEditBlog = (data: BlogType) => {
		setShowModal({
			show: true,
			type: typeEnum.Edit,
			blog: data,
		})
	}

	return (
		<section className='blog bkg-gray'>
			<div className='banner'>
				<h1 className='banner-title'>Blog</h1>
			</div>
			<div className='container'>
				{userInfo && userInfo.isAdmin && (
					<div className='container-button'>
						<Button className='show-add-blog' onClick={handleOpen}>
							Add Blog
						</Button>
					</div>
				)}
				<div className='blog-container'>
					{blogs && blogs.length > 0 ? (
						blogs.map((blog) => {
							return (
								<div className='blog-box' key={blog._id}>
									<div className='info-blog'>
										{moment(blog.createdAt).format('MM-DD-YYYY')} - {blog.author}
									</div>
									<Tooltip label={blog.title} placement='top'>
										<Link to={`/blog/${blog._id}`} className='title-blog'>
											{blog.title}
										</Link>
									</Tooltip>
									<a className='summary-text' href={`/blog/${blog._id}`}>Read more</a>
									{userInfo && userInfo.isAdmin ? (
										<div className='group-btn'>
											<i className='fa-solid fa-pen-to-square icon-edit' onClick={() => handleEditBlog(blog)}></i>
											<i className='fa-solid fa-trash icon-delete' onClick={() => handleDeleteBlog(blog._id!)}></i>
										</div>
									) : null}
								</div>
							)
						})
					) : (
						<div className='no-blogs'>
							<p className='content'>No Blogs</p>
							<a href='/' className='back'>
								Go to homepage
							</a>
						</div>
					)}
				</div>
			</div>
			{showModal.show && <ModalEditAddBlog setShowModal={setShowModal} isShowModal={showModal} handleRefectchData={handleRefetchData} />}
		</section>
	)
}
