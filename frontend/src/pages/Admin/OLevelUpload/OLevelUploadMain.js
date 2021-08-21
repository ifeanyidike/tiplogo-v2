import React, { useState } from 'react'
import Content from "../Content"
import OLevelUploadList from "./OLevelUploadList"
import OLevelUploadDetails from "./OLevelUploadDetails"

const CardOrders = () => {
    const [value, setValue] = useState(0);
    const labels = ["O Level Upload List", "O Level Upload Details"]


    return (
        <div>
            <Content
                labels={labels}
                TabContent={
                    [<OLevelUploadList setValue={setValue} />,
                    <OLevelUploadDetails setValue={setValue} />
                    ]}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}

export default CardOrders
