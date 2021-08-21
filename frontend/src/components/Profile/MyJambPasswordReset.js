import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import FixedTable from "./ProfileFixedHeaderTable"
import Loader from "../Loaders/SimpleLoader"
import { ItemOverviewContainer, ItemOverviewMain } from "../../styles/ProfileStyle"
import { listMyJambPasswordResetOrders, getJambPasswordResetOrderDetailsById } from '../../redux/actions/jambPasswordResetActions'
import { useLocation } from "react-router-dom"
import queryString from 'query-string'
import { Card, CardContent, Divider } from '@material-ui/core'

const MyJambPasswordReset = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { itemId } = queryString.parse(location.search)
    const headCells = [
        { id: '_id', label: 'Order ID' },
        { id: 'price', label: 'Price' },
    ];
    const orderHeaders = [
        { id: 'email', label: 'Email' },
        { id: 'name', label: "Name" },

    ]

    useEffect(() => {
        dispatch(listMyJambPasswordResetOrders())
    }, [dispatch])

    useEffect(() => {
        dispatch(getJambPasswordResetOrderDetailsById(itemId))
    }, [dispatch, itemId])

    const jambPasswordResetOrderDetails = useSelector(state => state.jambPasswordResetOrderDetails)
    const { loading: detailLoading, order } = jambPasswordResetOrderDetails

    const { loading, error, orders } = useSelector(state => state.jambPasswordResetOrderListMy)


    return (
        <ItemOverviewMain>
            <h2>My password reset orders</h2>
            {
                loading ? <Loader />
                    :
                    error ? error
                        :
                        <FixedTable
                            columns={headCells}
                            rows={orders}
                            orderItems={["email", "name"]}
                            orderHeaders={orderHeaders}
                        />
            }

            <ItemOverviewContainer>

                {
                    detailLoading ? <Loader />
                        :
                        order ?
                            <React.Fragment>

                                <Card className="card__content">
                                    <CardContent>
                                        <div className="contents">
                                            <div>
                                                <span>Candidate's name:</span>
                                                <span>{order.orderItems && order.orderItems.name}</span>
                                            </div>

                                            <div>
                                                <span>Candidate's Email:</span>
                                                <span>{order.orderItems && order.orderItems.email}</span>
                                            </div>

                                            <div>
                                                <span>Candidate's Date of Birth:</span>
                                                <span>{order.orderItems && new Date(order.orderItems.dateOfBirth).toDateString()}</span>
                                            </div>

                                            <div>
                                                <span>Candidate's New Password</span>
                                                <span>{order.orderItems && order.orderItems.newPassword}</span>
                                            </div>
                                            <div className="fullwidth">
                                                <Divider />
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
                                                <span>{order.paymentResult && order.paymentResult.email}</span>
                                            </div>
                                            <div>
                                                <span>Payment Status:</span>
                                                <span>{order.paymentResult && order.paymentResult.status}</span>
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
                            :
                            <Card>
                                <CardContent>
                                    You have not selected any order
                            </CardContent>
                            </Card>
                }


            </ItemOverviewContainer>

        </ItemOverviewMain>
    )
}

export default MyJambPasswordReset
