import React, { useEffect } from 'react'
import Content from "../TableContent"
import { useDispatch, useSelector } from "react-redux"
import { createCard, listCards } from "../../../redux/actions/cardActions"
import { useHistory } from "react-router-dom"
import { AdminButtonPro, RightAlign } from "../../../styles/AdminStyles"

const CardsList = ({ setValue }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Card Name' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
        { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date created' },
    ];

    useEffect(() => {
        dispatch(listCards())
    }, [dispatch])

    const handleOverview = (id) => {
        setValue(1)
        history.push(`/admin/cards?cardId=${id}`)
    }

    const { error, loading, cards } = useSelector(state => state.cardList)
    const { error: createError, loading: createLoading, createdCard } =
        useSelector(state => state.cardCreate)

    const handleAddNew = () => {
        dispatch(createCard())
        dispatch(listCards())
    }

    useEffect(() => {
        if (createdCard) {
            setValue(1)
            history.push(`/admin/cards/?cardId=${createCard._id}`)
        }
    }, [createdCard, history, setValue])

    return (
        <div>
            <Content
                caption="Card List"
                headCells={headCells}
                setValue={setValue}
                error={
                    error ? error : createError ? createError : null}
                loading={loading ? loading : createLoading ? createLoading : null}
                items={cards}
                handleOverview={handleOverview}
                anchor="_id"
                displayArr={["name", "price"]}
            />
            <RightAlign >
                <AdminButtonPro onClick={handleAddNew}>Add a new card</AdminButtonPro>
            </RightAlign>
        </div>
    )
}

export default CardsList
