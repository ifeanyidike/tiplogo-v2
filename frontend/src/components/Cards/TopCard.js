import React from 'react'
import { TopCardPane } from "../../styles/CardStyle"
import {
    topCardVariants,
} from "../../animationVariants/HomeVariants"
import { Link } from "react-router-dom"

const TopCard = ({ icon, title, bcolor, href }) => {
    return (
        <Link to={href}>
            <TopCardPane
                bcolor={bcolor}
                variants={topCardVariants}
                initial="initial"
                animate="animate"
            >

                <i className={icon} />
                <span>{title}</span>

            </TopCardPane>
        </Link>
    )
}

export default TopCard
