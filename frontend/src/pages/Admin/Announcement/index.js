import React, { useState } from 'react'
import Content from '../Content'
import AnnouncementManager from './AnnouncementManager'

const ManageEmails = () => {
  const [value, setValue] = useState(0)
  const labels = ['Manage Announcements']

  return (
    <div>
      <Content
        labels={labels}
        TabContent={[<AnnouncementManager setValue={setValue} />]}
        value={value}
        setValue={setValue}
      />
    </div>
  )
}

export default ManageEmails
