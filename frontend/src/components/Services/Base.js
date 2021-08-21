import React from 'react'
import {
    BaseContainer,
    CardMoreContainer,
} from "../../styles/ServiceStyle.js"
import LoadCards from "../LoadCards"
import Header from "../MainHeader"
import LinearLoader from "../Loaders/LinearLoader"
import Message from "../Message"

const Base = ({
    cardLoading,
    cardError,
    cards,
    TopImage,
    topText,
    children,
    bgHeight
}) => {

    // const drawerToggle = useSelector(state => state.drawerToggle)

    return (
        <>
            <Header />
            <BaseContainer >
                <div className="topimage">
                    <div className="centeritem">
                        {TopImage}

                        <h4>{topText}</h4>
                    </div>
                </div>
                {
                    cardLoading ? <LinearLoader />
                        :
                        cardError ?
                            <Message variant="error">
                                {cardError}
                            </Message>
                            :
                            <>
                                {children}
                                <CardMoreContainer>
                                    <LoadCards
                                        loading={cardLoading}
                                        cards={cards}
                                        error={cardError}
                                    />
                                </CardMoreContainer>
                            </>
                }
            </BaseContainer>
        </>
    )
}

export default Base
