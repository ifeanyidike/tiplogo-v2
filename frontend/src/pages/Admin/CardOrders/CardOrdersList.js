import React, { useEffect } from 'react'
import Content from "../TableContent"
import { useDispatch, useSelector } from "react-redux"
import { listCardOrders } from "../../../redux/actions/cardOrderActions"
import { useHistory } from "react-router-dom"

const UsersList = ({ setValue }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Card Name' },
        { id: 'qty', numeric: true, disablePadding: false, label: 'Qty' },
        { id: 'price', numeric: true, disablePadding: false, label: 'price' },
        { id: 'user', numeric: true, disablePadding: false, label: 'Buyer' },
        { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date created' },
    ];

    useEffect(() => {
        dispatch(listCardOrders())
    }, [dispatch])

    const handleOverview = (id) => {
        setValue(1)
        history.push(`/admin/cardorders?orderId=${id}`)
    }

    const { loading, orders, error } = useSelector(state => state.cardOrderList)

    return (
        <div>
            <Content
                caption="CardOrders List"
                headCells={headCells}
                setValue={setValue}
                error={error && error}
                loading={loading && loading}
                items={orders && orders}
                handleOverview={handleOverview}
                anchor="_id"
                displayArr={["name", "qty", "price"]}
                showUser={true}
            />
        </div>
    )
}

export default UsersList
