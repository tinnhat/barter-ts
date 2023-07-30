import { Button } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { useGetOrderHistoryQuery } from '../../hooks/userHooks'
import './style.scss'
type Props = {}

export default function OrderHistory({}: Props) {
  const navigate = useNavigate()
  const { data: orders } = useGetOrderHistoryQuery()
  const { state } = useContext(Store)
  const { userInfo } = state
  useEffect(() => {
    if (JSON.stringify(userInfo) === '{}') {
      navigate('/signin?redirect=/order-history')
    }
  }, [userInfo])
  return (
    <>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <section className='orderHis'>
        <div className='container'>
          <div className='orderHis-container'>
            <p className='title'>Order History</p>
          </div>
          <div className='orderHis-table'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : 'No'}
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            navigate(`/order/${order._id}`)
                          }}
                          className='btn-detail'
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
