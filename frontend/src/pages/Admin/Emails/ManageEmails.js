import React, { useState } from 'react'
import Content from "../Content"
import EmailManager from "./EmailManager"


const ManageEmails = () => {

    const [value, setValue] = useState(0);
    const labels = ["Manage Emails"]

    return (
        <div>
            <Content
                labels={labels}
                TabContent={[<EmailManager setValue={setValue} />]}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}

export default ManageEmails
