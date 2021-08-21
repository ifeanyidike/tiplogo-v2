import React,{useEffect, useState} from 'react'
import {CountContainer} from "../styles/CounterStyle"

const Counter = ({max}) => {
    const [count, setCount] = useState(0)
    
    useEffect(()=>{
        if(count < parseInt(max)){
            setTimeout(()=> setCount(count + 1), 1)
        }
    },[count, max])
    
    return (
        <CountContainer>
            <span>{count}</span>
        </CountContainer>
    )
}

export default Counter
