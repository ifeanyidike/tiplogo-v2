import React from 'react'
import AltCard from "./Cards/AltCard"
import Loader from "./Loaders/SimpleLoader"
import Message from "./Message"
import {
  firstCardContainerVariants,
  secondCardContainerVariants,
  thirdCardContainerVariants,
  fourthCardContainerVariants
} from '../animationVariants/CardVariants'

const LoadCards = ({ loading, cards, error, href }) => {

  const chooseVariant = (index) => {
    if (index === (10 % 10)) {
      return firstCardContainerVariants
    } else if (index === ((10 % 10) + 1)) {
      return secondCardContainerVariants
    } else if (index % 2 === 0) {
      return thirdCardContainerVariants
    } else if (index === ((10 % 10) + 3)) {
      return fourthCardContainerVariants
    } else if ((index % 2) !== 0) {
      return thirdCardContainerVariants
    } else {
      return fourthCardContainerVariants
    }
  }

  const chooseColor = (index) => {
    if (index === (10 % 10)) {
      return "darkblue"
    } else if (index === ((10 % 10) + 1)) {
      return "lightgreen"
    } else if (index % 2 === 0) {
      return "lightblue"
    } else if (index === ((10 % 10) + 3)) {
      return "goldish"
    } else if ((index % 2) !== 0) {
      return "lightblue"
    } else {
      return "goldish"
    }
  }

  return (
    <>
      <h2>Our Cards</h2>
      <p className="top__paragraph">
        At Pin Cafes, we are a step ahead in providing you the best card services. Buy cards from our pool of cards today.</p>

      <div className="card__container">
        {loading ?
          <Loader /> :
          error ?
            <Message variant="error">
              {error}
            </Message>
            :
            cards && cards.map((feature, index) => (
              <AltCard
                key={feature._id}
                id={feature._id}
                src={feature.upload.image}
                title={feature.name}
                desc={feature.description}
                anchor="Buy Now!"
                color={chooseColor(index)}
                variants={chooseVariant(index)}
                href={href}
              />
            ))
        }
      </div>
    </>
  )
}

export default LoadCards
