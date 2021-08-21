import React, { useState, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { UserProfileContainer, AdminButton } from "../../../styles/AdminStyles"
import CurrencyFormat from "react-currency-format"
import { Avatar, Card, CardContent, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux"
import Loader from "../../../components/Loaders/SimpleLoader"
import { getAUser, makeUserAdmin, makeUserEditor } from "../../../redux/actions/userActions"
import { listMyCards } from "../../../redux/actions/soldCardActions"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import { deleteAUser } from "../../../redux/actions/userActions"
import { listMyNotPaidCardOrders } from '../../../redux/actions/cardOrderActions';
import { listMyChangeOfCourseOrders } from '../../../redux/actions/changeOfCourseActions';
import { listMyJambPasswordResetOrders } from '../../../redux/actions/jambPasswordResetActions';
import { listMyOlevelUploadOrders } from '../../../redux/actions/oLevelResultUploadActions';
import MessageModal from "../../../components/Utils/MessageModal"

const UserProfile = () => {
    const [deletePrompt, setDeletePrompt] = useState(false)

    const [isAdmin, setIsAdmin] = useState(false)

    const [isEditor, setIsEditor] = useState(false)

    const dispatch = useDispatch()
    const location = useLocation()
    const { userId } = queryString.parse(location.search)

    useEffect(() => {
        if (userId) {
            dispatch(getAUser(userId))
            dispatch(listMyCards(userId))
            dispatch(listMyNotPaidCardOrders(userId))
            dispatch(listMyChangeOfCourseOrders(userId))
            dispatch(listMyJambPasswordResetOrders(userId))
            dispatch(listMyOlevelUploadOrders(userId))
        }

    }, [dispatch, userId])

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, user } = useSelector(state => state.userList)
    const { cards } = useSelector(state => state.cardMy)
    const { orders: cardOrders } = useSelector(state => state.cardMyOrderNotPaidList)
    const { orders: cocOrders } = useSelector(state => state.changeOfCourseOrderListMy)
    const { orders: olruOrders } = useSelector(state => state.oLevelUploadOrderListMy)
    const { orders: jprOrders } = useSelector(state => state.jambPasswordResetOrderListMy)
    const { loading: makeAdminLoading } = useSelector(state => state.userMakeAdmin)
    const { loading: makeEditorLoading } = useSelector(state => state.userMakeEditor)

    const { loading: deleteLoading } = useSelector(state => state.userDelete)

    useEffect(() => {
        if (user) {
            setIsAdmin(user.isAdmin)
            setIsEditor(user.isEditor)
        }
    }, [user])

    const handleMakeAdmin = () => {
        dispatch(makeUserAdmin(userId, !user.isAdmin))
        setIsAdmin(!isAdmin)
    }

    const handleMakeEditor = () => {
        dispatch(makeUserEditor(userId, !user.isEditor))
        setIsEditor(!isEditor)
    }

    const handleUserDelete = () => {
        dispatch(deleteAUser(userId))
        setDeletePrompt(false)
    }

    return (
        <UserProfileContainer>
            {
                loading ? <Loader />
                    :
                    deleteLoading ? <Loader />
                        :
                        user ?
                            <React.Fragment>
                                <Card className="card__image">
                                    <CardContent>
                                        <Avatar className="profile_pic"
                                            src={user.profile && user.profile.picture} />

                                    </CardContent>
                                </Card>
                                <Card className="card__content">
                                    <CardContent>
                                        <div className="heading">
                                            <h2>{user.name}</h2>
                                            <div>
                                                <span>Balance:</span>
                                                <CurrencyFormat value={user.wallet}
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
                                                <span>Email:</span>
                                                <span>{user.email}</span>
                                            </div>
                                            <div>
                                                <span>Joined on:</span>
                                                <span>{new Date(user.createdAt).toDateString()}</span>
                                            </div>
                                            <div>
                                                <span>Email confirmation status:</span>
                                                <span style={{ color: user.confirmed ? 'green' : 'red' }}>{user.confirmed ? 'confirmed' : 'Not confirmed'}</span>
                                            </div>
                                            <div>
                                                <span>Admin status:</span>
                                                <span >
                                                    {user.admin ? 'Admin' : 'Not Admin'}</span>
                                            </div>
                                            <div>
                                                <span>Sign up with:</span>
                                                <span >
                                                    {user.type.replace(/\b\w/g, l => l.toUpperCase())}</span>
                                            </div>
                                            <div>
                                                <span>Last update on account:</span>
                                                <span >
                                                    {new Date(user.updatedAt).toDateString()}</span>
                                            </div>
                                            <div>
                                                <span>Cards bought:</span>
                                                <span>{cards && cards.length}</span>
                                            </div>
                                            <div>
                                                <span>Card orders not paid:</span>
                                                <span>{cardOrders && cardOrders.length}</span>
                                            </div>
                                            <div>
                                                <span>Change of course orders:</span>
                                                <span>{cocOrders && cocOrders.length}</span>
                                            </div>
                                            <div>
                                                <span>Jamb password reset orders:</span>
                                                <span>{jprOrders && jprOrders.length}</span>
                                            </div>
                                            <div>
                                                <span>O level result upload orders:</span>
                                                <span>{olruOrders && olruOrders.length}</span>
                                            </div>

                                            {
                                                user.profile && (
                                                    <>
                                                        {
                                                            user.profile.phoneNo ?
                                                                <div>
                                                                    <span>Phone Number:</span>
                                                                    <span >
                                                                        {user.profile.phoneNo}</span>
                                                                </div>
                                                                :
                                                                ''
                                                        }
                                                        {
                                                            user.profile.address ?
                                                                <div>
                                                                    <span>Address:</span>
                                                                    <span >
                                                                        {user.profile.address}</span>
                                                                </div>
                                                                :
                                                                ''
                                                        }

                                                    </>
                                                )
                                            }

                                        </div>

                                        <Divider />
                                        <div className="actions">
                                            {userInfo.isAdmin &&
                                                <>
                                                    <FormControlLabel
                                                        control={<Switch checked={isAdmin}
                                                            onChange={handleMakeAdmin} />}
                                                        label={isAdmin ? "Admin" : "Not Admin"}
                                                    />
                                                    <FormControlLabel
                                                        control={<Switch checked={isEditor}
                                                            onChange={handleMakeEditor} />}
                                                        label={isEditor ? "Manager" : "Not Manager"}
                                                    />
                                                    <AdminButton onClick={() => setDeletePrompt(true)}>Delete User</AdminButton>
                                                </>


                                            }
                                        </div>

                                    </CardContent>
                                </Card>


                                <MessageModal
                                    open={deletePrompt}
                                    setOpen={setDeletePrompt}
                                    caption={`Delete ${user && user.name}'s account`}
                                    message={
                                        <div className='delete'>
                                            <h4 className="deleteheader">This action is not reversable</h4>
                                            <p>Are you sure you want to delete {user.name}'s account</p>
                                            {
                                                user.wallet > 0 &&
                                                <p>This user has funds in their wallet.
                                                On selection "Yes", the wallet will also be cleared.
                                                </p>
                                            }
                                            <div className="deleteconfirm">
                                                <AdminButton onClick={() => setDeletePrompt(false)}>No</AdminButton>
                                                <AdminButton onClick={handleUserDelete}>Yes</AdminButton>
                                            </div>
                                        </div>
                                    }
                                />


                                {/* <MessageModal
                                    open={messagePrompt}
                                    setOpen={setMessagePrompt}
                                    caption="Message"
                                    message={
                                        <>
                                            <div>{makeAdminError && makeAdminError}</div>
                                            <div>{deleteError && deleteError}</div>
                                        </>
                                    }
                                /> */}

                            </React.Fragment>
                            :
                            <Card>
                                <CardContent>
                                    You have not selected any user
                            </CardContent>
                            </Card>
            }


        </UserProfileContainer>
    )
}

export default UserProfile
