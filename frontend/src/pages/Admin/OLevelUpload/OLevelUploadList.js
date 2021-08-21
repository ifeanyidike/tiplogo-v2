import React, { useEffect } from 'react'
import Content from "../TableContent"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { listOlevelUploadOrders } from '../../../redux/actions/oLevelResultUploadActions'

const OLevelUploadList = ({ setValue }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const headCells = [
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Cost' },
        { id: 'user', numeric: true, disablePadding: false, label: 'Customer' },
        { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date created' },
    ];

    useEffect(() => {
        dispatch(listOlevelUploadOrders())
    }, [dispatch])

    const handleOverview = (id) => {
        setValue(1)
        history.push(`/admin/olevelupload?orderId=${id}`)
    }

    const { error, loading, orders } = useSelector(state => state.oLevelUploadOrderList)


    return (
        <div>
            <Content
                caption="O Level Upload Order List"
                headCells={headCells}
                setValue={setValue}
                error={error && error}
                loading={loading && loading}
                items={orders}
                handleOverview={handleOverview}
                anchor="_id"
                showUser={true}
                showCost={true}
                displayArr={["type"]}
            />

        </div>
    )
}

export default OLevelUploadList
