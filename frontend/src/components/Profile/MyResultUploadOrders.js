import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  listMyOlevelUploadOrders,
  getOlevelUploadOrderDetailsById,
} from '../../redux/actions/oLevelResultUploadActions'
import FixedTable from './ProfileFixedHeaderTable'
import Loader from '../Loaders/SimpleLoader'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import {
  ItemOverviewContainer,
  ItemOverviewMain,
} from '../../styles/ProfileStyle'
import { Card, CardContent } from '@material-ui/core'

const MyResultUploadOrders = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { itemId } = queryString.parse(location.search)

  const headCells = [
    { id: '_id', label: 'Order ID' },
    { id: 'price', label: 'Price' },
  ]
  const orderHeaders = [
    { id: 'Type', label: 'Type' },
    { id: 'Name', label: 'Name' },
  ]

  useEffect(() => {
    dispatch(listMyOlevelUploadOrders())
    dispatch(getOlevelUploadOrderDetailsById(itemId))
  }, [dispatch, itemId])

  const { loading, error, orders } = useSelector(
    (state) => state.oLevelUploadOrderListMy,
  )

  const oLevelUploadOrderDetails = useSelector(
    (state) => state.oLevelUploadOrderDetails,
  )
  const { loading: detailLoading, order } = oLevelUploadOrderDetails

  const replacePdfExtWithJpg = (file) => {
    if (file.slice(-3) === 'pdf') {
      return file.replace(file.slice(-3), 'jpg')
    } else {
      return file
    }
  }

  return (
    <ItemOverviewMain>
      <h2>My result upload orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        error
      ) : (
        <FixedTable
          columns={headCells}
          rows={orders}
          admin_upload={orders}
          orderItems={['type', 'name']}
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
                    <span>{order.orderItems && order.orderItems.name}</span>
                  </div>

                  <div>
                    <span>Candidate's Profile Code:</span>
                    <span>
                      {order.orderItems && order.orderItems.profileCode}
                    </span>
                  </div>

                  <div>
                    <span>Candidate's Order Type:</span>
                    <span>{order.orderItems && order.orderItems.type}</span>
                  </div>

                  <div className="fullwidth">
                    <div className="embossitem flexemboss">
                      {order.orderItems &&
                        order.orderItems.files &&
                        order.orderItems.files.map(
                          (file) =>
                            file && (
                              <div key={file._id}>
                                <img
                                  src={replacePdfExtWithJpg(file.image)}
                                  alt={file.image}
                                />
                              </div>
                            ),
                        )}
                    </div>
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

export default MyResultUploadOrders
