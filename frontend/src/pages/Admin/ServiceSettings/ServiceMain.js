import React, { useState } from 'react'
import Content from "../Content"
import Services from "./Services"
import Schools from "./Schools"
import Courses from "./Courses"
import { useSelector } from 'react-redux'

const ServiceMain = () => {

    const [value, setValue] = useState(0);
    const { userInfo } = useSelector(state => state.userLogin)

    const labels = userInfo.isAdmin ? ["Set Service Costs",
        "Manage Institutions/Courses", "Courses"] : ["Manage Institutions/Courses", "Courses"]

    const TabContent = userInfo.isAdmin ?
        [<Services setValue={setValue} value={0} />,
        <Schools setValue={setValue} value={1} />,
        <Courses setValue={setValue} value={2} />
        ] :
        [<Schools setValue={setValue} value={1} />,
        <Courses setValue={setValue} value={2} />
        ]

    return (
        <div>
            <Content
                labels={labels}
                TabContent={TabContent}
                value={value}
                setValue={setValue}
            />

        </div>
    )
}

export default ServiceMain
