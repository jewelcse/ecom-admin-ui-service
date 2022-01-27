import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route, useParams } from 'react-router-dom'
var axios = require('axios')

const OrdersDetail = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [dProfiles, setDProfiles] = useState([])
  const [dProfile, setDProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  let params = useParams()
  console.log(params.orderId)
  var config = {
    method: 'get',
    url: 'http://localhost:8300/api/v1/order-service/get/order-details/' + params.orderId,
    headers: {
      Authorization: 'Bearer 07fa274e-0c8e-4880-ba84-fe865c700774',
    },
  }
  var config3 = {
    method: 'get',
    url: 'http://localhost:9191/api/v1/auth-service/get/delivery/mens',
    headers: {
      Authorization: 'Basic d2ViOnNlY3JldA==',
    },
  }

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setOrderDetails(response.data)
        setIsLoading(false)
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    axios(config3)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        setDProfiles(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  console.log(dProfiles)
  const dPHandler = (e) => {
    setDProfile(e.target.value)
  }
  const updateOrder = () => {
    var data = JSON.stringify({
      orderId: params.orderId,
      deliveryManUsername: dProfile,
    })
    var config3 = {
      method: 'post',
      url: 'http://localhost:8300/api/v1/order-service/order/update/delivery/profile',
      headers: {
        Authorization: 'Bearer 07fa274e-0c8e-4880-ba84-fe865c700774',
        'Content-Type': 'application/json',
        Cookie: 'JSESSIONID=7C46F037CD5C465A3C83752A0D48D974',
      },
      data: data,
    }
    axios(config3)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  if (isLoading) {
    return <h1>Loading....</h1>
  }
  return (
    <div style={{ border: '10px solid green', padding: '20px' }}>
      <p>Order ID: {orderDetails?.id}</p>
      <p>Order Placed By: {orderDetails?.username}</p>
      <p>Date: {orderDetails?.createdAt}</p>
      <p>Priority: {orderDetails?.priority}</p>
      <p>Quantity: {orderDetails?.quantity}</p>
      <p>
        Products:
        <ul>
          {orderDetails?.products.map((item, index) => {
            return (
              <div key={index} style={{ marginBottom: '5px', border: '2px solid green' }}>
                <p>Product Title: {item.productTitle}</p>
                <p>Product Price: {item.productFinalPrice}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            )
          })}
        </ul>
      </p>
      <p>Shipping Charge: {orderDetails?.shippingCharge}</p>
      <p>Status: {orderDetails?.status}</p>
      <p>Subtotal: {orderDetails?.subTotal}</p>
      <p>Total Amount: {orderDetails?.totalAmount}</p>
      <div style={{ border: '5px solid red' }}>
        <p>Shipping Address:</p>
        <p>Address: {orderDetails?.shippingAddress.address}</p>
        <p>Area: {orderDetails?.shippingAddress.area}</p>
        <p>City: {orderDetails?.shippingAddress.city}</p>
        <p>Region: {orderDetails?.shippingAddress.region}</p>
        <p>Full Name: {orderDetails?.shippingAddress.fullName}</p>
        <p>Phone Number: {orderDetails?.shippingAddress.phoneNumber}</p>
      </div>
      <p style={{ border: '5px solid blue' }}>
        Delivery Man:{' '}
        {orderDetails?.deliveryMan && (
          <>
            <p>First name: {orderDetails?.deliveryMan.firstName}</p>
            <p>Last name: {orderDetails?.deliveryMan.lastName}</p>
            <p>Mobile: {orderDetails?.deliveryMan.username}</p>
          </>
        )}
        {orderDetails?.deliveryMan === null ? (
          <select onChange={dPHandler}>
            <option>Select Delivery man</option>
            {dProfiles.map((profile, index) => {
              return (
                <option key={index} value={profile?.username}>
                  {profile?.firstName}
                </option>
              )
            })}
          </select>
        ) : (
          ''
        )}
        {orderDetails?.deliveryMan === null ? (
          <button
            onClick={() => {
              updateOrder()
            }}
          >
            Update Order
          </button>
        ) : (
          ''
        )}
      </p>
    </div>
  )
}

export default OrdersDetail
