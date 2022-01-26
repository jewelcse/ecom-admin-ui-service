import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CBadge,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
var axios = require('axios')

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [dProfiles, setDProfiles] = useState([])
  const [visible, setVisible] = useState(false)
  const [profile, setProfile] = useState({})
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsloading] = useState(true)
  var config1 = {
    method: 'get',
    url: 'http://localhost:8300/api/v1/order-service/get/all-orders',
    headers: {
      Authorization: 'bearer 07fa274e-0c8e-4880-ba84-fe865c700774',
      Cookie: 'JSESSIONID=1FB41C1B596FE965B3DB460F3A6B1761',
    },
  }
  var config2 = {
    method: 'get',
    url: 'http://localhost:9191/api/v1/auth-service/get/delivery/mens',
    headers: {
      Authorization: 'Basic d2ViOnNlY3JldA==',
      Cookie: 'JSESSIONID=7C46F037CD5C465A3C83752A0D48D974',
    },
  }
  useEffect(() => {
    axios(config1)
      .then(function (response) {
        setOrders(response.data.data)
        setIsloading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    axios(config2)
      .then(function (response) {
        setDProfiles(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const dProfileHandler = (e) => {
    setProfile(e.target.value)
  }
  const updateOrder = (orderId) => {
    setVisible(!visible)
    setOrderId(orderId)
  }
  const assignDeliveryMan = () => {
    var data = JSON.stringify({
      orderId: orderId,
      deliveryManUsername: profile,
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
        setOrderId(null)
      })
      .catch(function (error) {
        console.log(error)
      })
    setVisible(false)
    setProfile(null)
  }
  console.log(orders)
  console.log(dProfiles)
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Orders {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Orders</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Completed Orders</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Canceled Orders</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">Order ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Customer</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Qty</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total Amount</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Priority</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {isLoading && <p>Loading....</p>}
                  {orders.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div className="text-center">{item.id}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="text-center">{item.username}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong className="text-center">{item.quantity}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong className="text-center">{item.totalAmount}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.status === 'DONE' && (
                          <CBadge color="primary" shape="rounded-pill">
                            {item.status}
                          </CBadge>
                        )}
                        {item.status === 'PAID' && (
                          <CBadge color="success" shape="rounded-pill">
                            {item.status}
                          </CBadge>
                        )}
                        {item.status === 'CANCELED' && (
                          <CBadge color="danger" shape="rounded-pill">
                            {item.status}
                          </CBadge>
                        )}
                        {item.status === 'PROCESSING' && (
                          <CBadge color="warning" shape="rounded-pill">
                            {item.status}
                          </CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="text-center">{item.priority} </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>COD </div>
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        {(item.deliveryMan === null) | (item.deliveryMan === '')
                          ? 'assigned'
                          : 'not assigned'}
                        <CButton onClick={() => updateOrder(item.id)}>Assign Delivery man</CButton>
                        <CModal
                          alignment="center"
                          visible={visible}
                          onClose={() => setVisible(false)}
                        >
                          <CModalHeader>
                            <CModalTitle>Assign Dellivery Man</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                              <CFormSelect
                                aria-label="Default select example"
                                name="dprofile"
                                onChange={dProfileHandler}
                              >
                                <option>Select Delivery Man</option>
                                {dProfiles.map((profile, index) => (
                                  <option value={profile.username} key={index}>
                                    {profile.firstName}---{profile.username}
                                  </option>
                                ))}
                              </CFormSelect>
                            </CRow>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                              Close
                            </CButton>
                            <CButton color="primary" onClick={() => assignDeliveryMan()}>
                              Update order
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell> */}
                      <CTableDataCell className="text-center">
                        <CButtonGroup role="group" aria-label="Basic example">
                          <Link to={'/details/' + item.id} className="text-center m-1">
                            Details
                          </Link>
                          {/* <Link to={'/details'} className="text-center m-1">
                            Details22
                          </Link> */}
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Orders
