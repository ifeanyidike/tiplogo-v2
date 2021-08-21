import React, { useState } from 'react'
import Content from "../Content"
import UsersList from "./UsersList"
import UserProfile from "./UserProfile"

const Users = () => {



    const [value, setValue] = useState(0);
    const labels = ["User List", "User Profile"]

    return (
        <div>
            <Content
                labels={labels}
                TabContent={[<UsersList setValue={setValue} />, <UserProfile />]}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}

export default Users
