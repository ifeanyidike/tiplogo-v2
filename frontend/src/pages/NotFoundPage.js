import React from 'react'
import MainHeader from '../components/MainHeader.js'
import { NotFoundContainer, AccessButton } from "../styles/NotFoundStyles.js"
import { useHistory } from "react-router-dom"
import Meta from "../components/Meta"

const NotFoundPage = () => {
  const history = useHistory()

  return (
    <NotFoundContainer >
      <Meta />
      <MainHeader />
      <div className="notfound">
        <p aria-label="404">
          <span data-text="O">O</span>
          <span data-text="P">P</span>
          <span data-text="P">P</span>
          <span data-text="S">S</span>
          <span data-text="!">!</span>

        </p>
        <span className="caption">404 - PAGE NOT FOUND</span>
        <span className="text">The page you are looking for might have been removed, </span>
        <span className="text">had its name changed or temporarily unavailable </span>
        <AccessButton onClick={() => history.push('/')}>GO TO HOMEPAGE</AccessButton>
      </div>
    </NotFoundContainer>
  )
}

export default NotFoundPage
