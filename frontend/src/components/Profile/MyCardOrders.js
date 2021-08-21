import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getCardOrderDetails, listMyCardOrders } from "../../redux/actions/cardOrderActions"
import { useLocation, useHistory } from "react-router-dom"
import queryString from 'query-string'
import FixedTable from "./ProfileFixedHeaderTable"
import Loader from "../Loaders/SimpleLoader"
import { ItemOverviewContainer, ProfileButtonAlt, ItemOverviewMain } from "../../styles/ProfileStyle"
import { Card, CardContent } from '@material-ui/core'
import { Avatar } from '@material-ui/core'


const MyCardOrders = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const { itemId } = queryString.parse(location.search)

    const headCells = [
        { id: '_id', label: 'Order ID' },
        { id: 'paymentMethod', label: 'Payment Method' },
    ];
    const orderHeaders = [
        { id: 'name', label: "Card name" },
        { id: 'price', label: "Price" },
        { id: 'qty', label: "Qty" },
    ]


    useEffect(() => {
        dispatch(listMyCardOrders())
        dispatch(getCardOrderDetails(itemId))
    }, [dispatch, itemId])

    const { loading, error, orders } = useSelector(state => state.cardOrderListMy)
    const { loading: detailLoading, order } = useSelector(state => state.cardOrderDetails)

    return (
        <ItemOverviewMain>
            <h2>My card orders</h2>
            {
                loading ? <Loader />
                    :
                    error ? error
                        :
                        <FixedTable
                            columns={headCells}
                            rows={orders}
                            orderItems={["name", "price", "qty"]}
                            orderHeaders={orderHeaders}
                        />
            }

            <ItemOverviewContainer>
                {
                    detailLoading ? <Loader />
                        :
                        order ?
                            <React.Fragment>
                                <Card className="card__image">
                                    <CardContent>
                                        <Avatar className="profile_pic"
                                            src={
                                                order.orderItems && (order.orderItems.image
                                                    || `/${order.orderItems.image}`)}
                                        />

                                    </CardContent>
                                </Card>
                                <Card className="card__content">
                                    <CardContent>

                                        <div className="contents">
                                            <div>
                                                <span>Card ID:</span>
                                                <span>{order.orderItems && order.orderItems.card}</span>
                                            </div>
                                            <div>
                                                <span>Qty: </span>
                                                <span>{order.orderItems && order.orderItems.qty}</span>
                                            </div>
                                            <div>
                                                <span>Payment status: </span>
                                                <span style={{ color: order.isPaid ? 'green' : 'red' }}
                                                >{order.isPaid ? "Paid" : "Not Paid"}</span>
                                            </div>
                                            <div>
                                                <span>Delivered status: </span>
                                                <span style={{ color: order.isDelivered ? 'green' : 'red' }}
                                                >{order.isDelivered ? "Delivered" : "Not Delivered"}</span>
                                            </div>
                                            {
                                                order.isPaid &&
                                                <>
                                                    <div>
                                                        <span>Paid At:</span>
                                                        <span>{new Date(order.paidAt).toDateString()}</span>
                                                    </div>
                                                    <div>
                                                        <span>Delivered At:</span>
                                                        <span>{new Date(order.deliveredAt).toDateString()}</span>
                                                    </div>
                                                </>
                                            }
                                            <div>
                                                <span>Created on:</span>
                                                <span>{new Date(order.createdAt).toDateString()}</span>
                                            </div>
                                            <div>
                                                <span>Last updated:</span>
                                                <span>{new Date(order.updatedAt).toDateString()}</span>
                                            </div>
                                            <div>
                                                <span>Payment method:</span>
                                                <span>{order.paymentMethod}</span>
                                            </div>
                                            {
                                                order.paymentResult &&
                                                <>
                                                    <div>
                                                        <span>Payment ID:</span>
                                                        <span>{order.paymentResult.id}</span>
                                                    </div>
                                                    <div>
                                                        <span>Payment Status:</span>
                                                        <span>{order.paymentResult.status}</span>
                                                    </div>
                                                    <div>
                                                        <span>Payment Email:</span>
                                                        <span>{order.paymentResult.email}</span>
                                                    </div>

                                                    <div className="fullwidth">
                                                        {
                                                            order.purchasedItems &&
                                                            order.purchasedItems.map((item) => (
                                                                (
                                                                    <div className="embossitem" key={item._id}>
                                                                        {
                                                                            item.pin &&
                                                                            <div>
                                                                                <span>PIN: </span>
                                                                                <span>{item.pin}</span>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            item.token &&
                                                                            <div>
                                                                                <span>Token: </span>
                                                                                <span>{item.token}</span>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            item.serialNo &&
                                                                            <div>
                                                                                <span>Serial Number: </span>
                                                                                <span>{item.serialNo}</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                )
                                                            ))
                                                        }
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {
                                            !order.isPaid &&
                                            <ProfileButtonAlt onClick={() => history.push(`/payorder/card?orderId=${order._id}`)}>
                                                Make Payment
                                            </ProfileButtonAlt>
                                        }
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

export default MyCardOrders
