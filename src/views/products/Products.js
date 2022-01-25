import React, { useState, useEffect } from 'react'
var axios = require('axios')
var FormData = require('form-data')
const Products = () => {
  var config = {
    method: 'get',
    url: 'localhost:8200/api/v1/product-service/get/products',
  }
  useEffect(() => {
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  return (
    <>
      <h1>Products</h1>
    </>
  )
}

export default Products
