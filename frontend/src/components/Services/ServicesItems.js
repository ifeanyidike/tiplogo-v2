import React from 'react'
import { Link } from 'react-router-dom'
import {
    firstCardContainerVariants,
    secondCardContainerVariants,
    thirdCardContainerVariants,
    // fourthCardContainerVariants
} from '../../animationVariants/CardVariants'
import { ServicesCard } from "../../styles/ServiceStyle"

const ServicesItems = () => {
    return (
        <>
            <ServicesCard
                variants={firstCardContainerVariants}
                initial='initial'
                animate='animate'
                whileHover='onHover'
                variant="darkblue"
            >

                <div className="icondiv">
                    <i className="fas fa-cloud-upload-alt"></i>
                </div>
                <h4>Jamb O-Level Result Upload</h4>
                <p>Fast Jamb O-Level upload. We offer fast response.
                <Link to="/data-correction/result-upload"> here</Link>
                </p>
            </ServicesCard>
            <ServicesCard
                variants={secondCardContainerVariants}
                initial='initial'
                animate='animate'
                whileHover='onHover'
                variant="lightgreen"
            >

                <div className="icondiv">
                    <i className="fas fa-exchange-alt"></i>
                </div>
                <h4>Change of Course & Institution</h4>
                <p>Change institutions for all Jamb accredited schools.
                Fast response and exceptional service. <Link to="/data-correction/change-of-course-institution">here</Link>
                </p>
            </ServicesCard>
            <ServicesCard
                variants={thirdCardContainerVariants}
                initial='initial'
                animate='animate'
                whileHover='onHover'
                variant="lightblue"
            >

                <div className="icondiv">
                    <i className="fas fa-history"></i>
                </div>
                <h4>Jamb Password Reset</h4>
                <p>Reset your Jamb password with just a few mouse clicks. <Link to="/data-correction/jamb-password-reset">here</Link>
                </p>
            </ServicesCard>

        </>
    )
}

export default ServicesItems
