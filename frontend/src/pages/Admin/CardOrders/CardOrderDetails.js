import React, { useState, useEffect } from 'react'
import { UserProfileContainer, AdminButton } from "../../../styles/AdminStyles"
import CurrencyFormat from "react-currency-format"
import { Avatar, Card, CardContent, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux"
import Loader from "../../../components/Loaders/LinearLoader"
import { deleteCardOrder, getCardOrderDetails, listCardOrders } from "../../../redux/actions/cardOrderActions"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import MessageModal from "../../../components/Utils/MessageModal"

const CardOrderDetails = ({ setValue }) => {
    const [deletePrompt, setDeletePrompt] = useState(false)

    const dispatch = useDispatch()
    const location = useLocation()
    const { orderId } = queryString.parse(location.search)

    useEffect(() => {
        if (orderId) {
            dispatch(getCardOrderDetails(orderId))
        }

    }, [dispatch, orderId])

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, order } = useSelector(state => state.cardOrderDetails)

    const handleOrderDelete = () => {
        dispatch(deleteCardOrder(orderId))
        setDeletePrompt(false)
        dispatch(listCardOrders())
        setValue(0)
    }

    return (
        <UserProfileContainer>
            {
                loading ? <Loader />
                    : error ? error
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
                                        <div className="heading">
                                            <h2>{order.orderItems && order.orderItems.name}</h2>
                                            <div>
                                                <span>Amount:</span>
                                                <CurrencyFormat value={order.orderItems && order.orderItems.price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'₦'}
                                                    renderText={value => <h4>{value}</h4>}
                                                />
                                            </div>
                                        </div>
                                        <Divider />
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
                                            <div>
                                                <span>Paid At:</span>
                                                <span>{new Date(order.paidAt).toDateString()}</span>
                                            </div>
                                            <div>
                                                <span>Delivered At:</span>
                                                <span>{new Date(order.deliveredAt).toDateString()}</span>
                                            </div>
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

                                        <Divider />
                                        {
                                            userInfo.isAdmin &&
                                            <div className="actions">
                                                <AdminButton onClick={() => setDeletePrompt(true)}>Delete Order</AdminButton>
                                            </div>
                                        }

                                    </CardContent>
                                </Card>

                                <MessageModal
                                    open={deletePrompt}
                                    setOpen={setDeletePrompt}
                                    caption={`Delete this order`}
                                    message={
                                        <div className='delete'>
                                            <h4 className="deleteheader">This action is not reversable</h4>
                                            <p>Are you sure you want to delete this order</p>
                                            <p>This will wipe the entire details of this order</p>
                                            <div className="deleteconfirm">
                                                <AdminButton onClick={() => setDeletePrompt(false)}>No</AdminButton>
                                                <AdminButton onClick={handleOrderDelete}>Yes</AdminButton>
                                            </div>
                                        </div>
                                    }
                                />


                            </React.Fragment>
                            :
                            <Card>
                                <CardContent>
                                    You have not selected any order
                            </CardContent>
                            </Card>
            }


        </UserProfileContainer>
    )
}

export default CardOrderDetails
