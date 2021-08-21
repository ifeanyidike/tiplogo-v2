import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { NumRangeContainer } from "../styles/ServiceStyle.js"

const NumRange = ({ num, setNum, setPrice, amount, limit }) => {
    const max = limit > 0 ? limit : 1
    const handleNumDecrement = () => {
        const newNum = num === 1 ? num : num - 1
        setNum(newNum)
        setPrice(newNum * amount)
    }

    const handleNumIncrement = () => {
        const newNum = num === max ? num : num + 1
        setNum(newNum)
        setPrice(parseInt(newNum * amount))
    }
    return (
        <NumRangeContainer>
            <button onClick={handleNumDecrement}>
                <RemoveIcon />
            </button>
            <span>{num}</span>
            <button onClick={handleNumIncrement}>
                <AddIcon />
            </button>
        </NumRangeContainer>
    )
}

export default NumRange
