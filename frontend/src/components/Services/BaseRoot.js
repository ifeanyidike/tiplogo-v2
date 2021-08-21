import React from 'react'
import { BaseContainer } from "../../styles/ServiceStyle.js"
import Header from "../MainHeader"

const Base = ({ TopImage, topText, children }) => {

    return (
        <>
            <Header />
            <BaseContainer height='20vh'>
                <div className="topimage">
                    <div className="centeritem">
                        {TopImage}
                        <h4>{topText}</h4>
                    </div>
                </div>
                {children}
            </BaseContainer>
        </>
    )
}

export default Base