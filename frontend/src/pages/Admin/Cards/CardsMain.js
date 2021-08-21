import React, { useState, useEffect } from 'react'
import Content from "../Content"
import CardsList from "./CardsList"
import CardDetails from "./CardDetails"
import { listCards } from "../../../redux/actions/cardActions"
import { useDispatch } from "react-redux"

const Cards = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const labels = ["Card List", "Card Details"]

    useEffect(() => {
        dispatch(listCards())
    }, [dispatch])

    return (
        <div>
            <Content
                labels={labels}
                TabContent={[<CardsList setValue={setValue} />,
                <CardDetails setValue={setValue} />]}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}

export default Cards
