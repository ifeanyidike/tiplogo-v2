import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FixedTable from './ProfileFixedHeaderTable'
import Loader from '../Loaders/SimpleLoader'
import {
  listMyChangeOfCourseOrders,
  getChangeOfCourseOrderDetailsById,
} from '../../redux/actions/changeOfCourseActions'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import {
  ItemOverviewContainer,
  ItemOverviewMain,
} from '../../styles/ProfileStyle'
import { Card, CardContent, Divider } from '@material-ui/core'

const MyChangeOfCourseOrders = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { itemId } = queryString.parse(location.search)

  const headCells = [
    { id: '_id', label: 'Order ID' },
    { id: 'price', label: 'Price' },
  ]
  const orderHeaders = [
    { id: 'type', label: 'Type' },
    { id: 'name', label: "Candidate's name" },
  ]

  useEffect(() => {
    dispatch(listMyChangeOfCourseOrders())
  }, [dispatch])

  useEffect(() => {
    dispatch(getChangeOfCourseOrderDetailsById(itemId))
  }, [dispatch, itemId])

  const { loading, error, orders } = useSelector(
    (state) => state.changeOfCourseOrderListMy,
  )
  const changeOfCourseOrderDetails = useSelector(
    (state) => state.changeOfCourseOrderDetails,
  )
  const { loading: detailLoading, order } = changeOfCourseOrderDetails

  const replacePdfExtWithJpg = (file) => {
    if (file.slice(-3) === 'pdf') {
      return file.replace(file.slice(-3), 'jpg')
    } else {
      return file
    }
  }

  return (
    <ItemOverviewMain>
      <h2>My data correction orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        error
      ) : (
        <FixedTable
          columns={headCells}
          rows={orders}
          orderItems={['type', 'fullName']}
          admin_upload={true}
          orderHeaders={orderHeaders}
        />
      )}

      <ItemOverviewContainer>
        {detailLoading ? (
          <Loader />
        ) : order ? (
          <React.Fragment>
            <Card className="card__image">
              <CardContent>
                {order.admin_upload && order.admin_upload.image ? (
                  <img
                    className="item__pic"
                    src={replacePdfExtWithJpg(order.admin_upload.image)}
                    alt="admin upload"
                  />
                ) : (
                  'No file yet. Admin will respond soon.'
                )}
              </CardContent>
            </Card>
            <Card className="card__content">
              <CardContent>
                <div className="contents">
                  <div>
                    <span>Candidate's name:</span>
                    <span>{order.orderItems && order.orderItems.fullName}</span>
                  </div>
                  <div>
                    <span>Candidate's OTP:</span>
                    <span>{order.orderItems && order.orderItems.otp}</span>
                  </div>
                  <div>
                    <span>Candidate's Profile Code:</span>
                    <span>
                      {order.orderItems && order.orderItems.profileCode}
                    </span>
                  </div>
                  <div>
                    <span>Candidate's regNo:</span>
                    <span>{order.orderItems && order.orderItems.regNo}</span>
                  </div>
                  <div>
                    <span>Candidate's Order Type:</span>
                    <span>{order.orderItems && order.orderItems.type}</span>
                  </div>

                  <div className="fullwidth">
                    {order.orderItems &&
                      order.orderItems.choices &&
                      order.orderItems.choices.map(
                        (choice, index) =>
                          choice && (
                            <div className="embossitem" key={choice._id}>
                              <div>
                                <span>Course {index + 1}: </span>
                                <span>{choice.course}</span>
                              </div>
                              <div>
                                <span>Institution {index + 1}: </span>
                                <span>{choice.institution}</span>
                              </div>
                              <div>
                                <span>Programme {index + 1}: </span>
                                <span>{choice.preferredProgramme}</span>
                              </div>
                            </div>
                          ),
                      )}
                  </div>
                  <div>
                    <span>Paid on:</span>
                    <span>{new Date(order.paidAt).toDateString()}</span>
                  </div>
                  <div>
                    <span>Payment method:</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div>
                    <span>Payment ID:</span>
                    <span>{order.paymentResult && order.paymentResult.id}</span>
                  </div>
                  <div>
                    <span>Payment Email:</span>
                    <span>
                      {order.paymentResult && order.paymentResult.email}
                    </span>
                  </div>
                  <div>
                    <span>Payment Status:</span>
                    <span>
                      {order.paymentResult && order.paymentResult.status}
                    </span>
                  </div>

                  <div>
                    <span>Created on:</span>
                    <span>{new Date(order.createdAt).toDateString()}</span>
                  </div>

                  <div>
                    <span>Last update on:</span>
                    <span>{new Date(order.updatedAt).toDateString()}</span>
                  </div>
                </div>

                <Divider />
              </CardContent>
            </Card>
          </React.Fragment>
        ) : (
          <Card>
            <CardContent>You have not selected any order</CardContent>
          </Card>
        )}
      </ItemOverviewContainer>
    </ItemOverviewMain>
  )
}

export default MyChangeOfCourseOrders
