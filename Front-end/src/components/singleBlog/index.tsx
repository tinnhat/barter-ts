import moment from 'moment'
import {useParams} from 'react-router-dom'
import {useGetBlogById} from '../../hooks/blogHooks'
import './style.scss'
import parse from 'html-react-parser'
import {Link} from 'react-router-dom'
type Props = {}

export default function SingleBlog({}: Props) {
	const params = useParams()
	const {id} = params
	const {data: blog} = useGetBlogById(id!)

	const renderEditor = () => {
		return (
			<div className='single-blog-review'>
				<div className='ql-editor'>{blog && parse(blog.content)}</div>
			</div>
		)
	}

	return (
		<section className='singleBlog'>
			<div className='banner'>
				<p className='time'>
					{moment(blog?.createdAt).format('MM-DD-YYYY')} - {blog?.author}
				</p>
				<h1 className='banner-title'>{blog?.title}</h1>
			</div>
			<div className='container'>
				<div className='singleBlog-container'>{renderEditor()}</div>
			</div>
			<div className='backToAll'>
				<Link to='/blog' className='btn-back'>
					Back to all posts
				</Link>
			</div>
		</section>
	)
}
