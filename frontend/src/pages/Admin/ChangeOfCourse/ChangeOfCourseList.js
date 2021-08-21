import React, { useEffect } from 'react'
import Content from "../TableContent"
import { useDispatch, useSelector } from "react-redux"
import { listChangeOfCourseOrders } from "../../../redux/actions/changeOfCourseActions"
import { useHistory } from "react-router-dom"
import { listServiceByName } from '../../../redux/actions/serviceActions'

const ChangeOfCourseList = ({ setValue }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const serviceName = 'jamb change of course and institution'

    const headCells = [
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Cost' },
        { id: 'user', numeric: true, disablePadding: false, label: 'Customer' },
        { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date created' },
    ];

    useEffect(() => {
        dispatch(listChangeOfCourseOrders())
        dispatch(listServiceByName(serviceName))
    }, [dispatch])

    const handleOverview = (id) => {
        setValue(1)
        history.push(`/admin/changeofcourse?orderId=${id}`)
    }

    const { error, loading, orders } = useSelector(state => state.changeOfCourseOrderList)

    return (
        <div>
            <Content
                caption="Data correction order list"
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

export default ChangeOfCourseList
