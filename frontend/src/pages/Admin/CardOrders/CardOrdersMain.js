import React, { useState } from 'react'
import Content from '../Content'
import CardOrdersList from './CardOrdersList'
import CardOrderDetails from './CardOrderDetails'

const CardOrders = () => {
  const [value, setValue] = useState(0)
  const labels = ['Card Order List', 'Card Order Details']

  return (
    <div>
      <Content
        labels={labels}
        TabContent={[
          <CardOrdersList setValue={setValue} />,
          <CardOrderDetails setValue={setValue} />,
        ]}
        value={value}
        setValue={setValue}
      />
    </div>
  )
}

export default CardOrders
