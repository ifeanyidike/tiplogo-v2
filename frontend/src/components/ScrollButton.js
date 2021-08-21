import React from 'react'
import { ScrollContainer } from '../styles/ScrollStyles'
import { IconButton } from "@material-ui/core"
import { animateScroll as scroll } from 'react-scroll'
import useWindowYOffset from "./Utils/useWindowYOffset"

const ScrollButton = () => {

    const yOffset = useWindowYOffset()

    return (
        <ScrollContainer style={{ display: yOffset > 0 ? 'block' : 'none' }} onClick={() => scroll.scrollToTop()}>
            <IconButton>
                <i className="fas fa-chevron-up"></i>
            </IconButton>

        </ScrollContainer>
    )
}

export default ScrollButton
