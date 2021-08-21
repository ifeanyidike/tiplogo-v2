import React, { useState } from 'react'
import Content from "../Content"
import ChangeOfCourseList from "./ChangeOfCourseList"
import ChangeOfCourseDetails from "./ChangeOfCourseDetails"

const CardOrders = () => {
    const [value, setValue] = useState(0);
    const labels = ["Data Correction Order List", "Data Correction Order Details"]

    return (
        <div>
            <Content
                labels={labels}
                TabContent={
                    [<ChangeOfCourseList setValue={setValue} />,
                    <ChangeOfCourseDetails setValue={setValue} />
                    ]}
                value={value}
                setValue={setValue}
            />


        </div>
    )
}

export default CardOrders
