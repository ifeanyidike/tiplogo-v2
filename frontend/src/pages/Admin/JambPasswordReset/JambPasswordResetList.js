import React, { useEffect } from 'react'
import Content from "../TableContent"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { listJambPasswordResetOrders } from '../../../redux/actions/jambPasswordResetActions'

const OLevelUploadList = ({ setValue }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: "Candidate's name" },
        { id: 'price', numeric: true, disablePadding: false, label: 'Cost' },
        { id: 'user', numeric: true, disablePadding: false, label: 'Customer' },
        { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date created' },
    ];

    useEffect(() => {
        dispatch(listJambPasswordResetOrders())
    }, [dispatch])

    const handleOverview = (id) => {
        setValue(1)
        history.push(`/admin/jambpasswordreset?orderId=${id}`)
    }

    const { error, loading, orders } = useSelector(state => state.jambPasswordResetOrderList)

    return (
        <div>
            <Content
                caption="Jamb Password Reset Order List"
                headCells={headCells}
                setValue={setValue}
                error={error && error}
                loading={loading && loading}
                items={orders}
                handleOverview={handleOverview}
                anchor="_id"
                showUser={true}
                showCost={true}
                displayArr={["name"]}
            />

        </div>
    )
}

export default OLevelUploadList
