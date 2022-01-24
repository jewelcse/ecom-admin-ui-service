import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((json) => {
        setOrders(json)
      })
  }, [])
  console.log(orders)
  return (
    <>
      <h1>Orders</h1>
    </>
  )
}

export default Orders
