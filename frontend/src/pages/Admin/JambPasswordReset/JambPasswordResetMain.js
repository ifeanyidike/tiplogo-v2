import React, { useState } from 'react'
import Content from "../Content"
import JambPasswordResetList from "./JambPasswordResetList"
import JambPasswordResetDetails from "./JambPasswordResetDetails"

const CardOrders = () => {
    const [value, setValue] = useState(0);
    const labels = ["Password Reset List", "Password Reset Details"]

    return (
        <div>
            <Content
                labels={labels}
                TabContent={
                    [<JambPasswordResetList setValue={setValue} />,
                    <JambPasswordResetDetails setValue={setValue} />
                    ]}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}

export default CardOrders
