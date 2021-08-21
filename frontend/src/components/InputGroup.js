import React from 'react'
import {InputGroupContainer} from "../styles/ServiceStyle"

const InputGroup = () => {
    return (
        <InputGroupContainer width={400}>
            <span>₦</span>
            <input type="text" />
            
        </InputGroupContainer>
    )
}

export default InputGroup
