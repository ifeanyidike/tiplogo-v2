import React, { useState, useEffect } from 'react'
import NumRange from "../NumRange"
import { useSelector } from "react-redux"
import ChoosePayment from './ChoosePayment';
import Wallet from "../Utils/Wallet"
import CurrencyFormat from 'react-currency-format';
import ServiceHowTo from './ServiceHowTo';

const BaseChildren = ({ baseAmount, availability, name }) => {

    const cardDetails = useSelector(state => state.cardDetails)
    const { loading: cardLoading, card, error: cardError } = cardDetails

    const [num, setNum] = useState(1)
    const [totalCost, setTotalCost] = useState(null)

    const cardOrderCreate = useSelector(state => state.cardOrderCreate)
    const { success: createSuccess } = cardOrderCreate

    useEffect(() => {
        if (!cardLoading && !cardError) {
            setTotalCost(card.price)
        }
    }, [cardLoading, cardError, card])




    return (
        <div className="children">

            <Wallet mt={50} width={300} />
            <div className="card__content__info" id='buypane'>
                <div className="buyinfo--edit">
                    {
                        !createSuccess &&
                        <div className="buyinfo--first edit">
                            <div className="number" >
                                <span>1</span>
                            </div>

                            <div className="contents">
                                <div className="numrange">
                                    <h5>How many cards?
                            <hr />
                                    </h5>
                                    <NumRange
                                        num={num}
                                        setNum={setNum}
                                        setPrice={setTotalCost}
                                        amount={parseInt(card && card.price)}
                                        limit={card && card.items && card.items.length}
                                    />
                                    <div className="price__items">
                                        <span className="price">
                                            <CurrencyFormat
                                                value={parseInt(totalCost)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'₦'}
                                                renderText={value => <h2>{value}</h2>}
                                            />

                                        </span>

                                        <small>
                                            <div></div>
                                            <span>
                                                {
                                                    card && card.items &&
                                                    (card.items.length > 0 ? "In stock" : "Out of stock")
                                                }
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="buyinfo--second">
                        <hr />

                        <div className="paymentmethod-alt">
                            <div className="number bottom" >
                                <span>2</span>
                            </div>
                            <ChoosePayment
                                num={num}
                                baseAmount={baseAmount}
                            />
                        </div>
                    </div>
                </div>
                <ServiceHowTo />
            </div>

        </div>
    )
}

export default BaseChildren
