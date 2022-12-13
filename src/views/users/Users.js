import React, { useEffect, useState } from 'react'
import { token } from '../token'
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
var axios = require('axios')

const Users = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:9191/api/v1/auth-service/get/users',
    }

    axios(config)
      .then(function (response) {
        setUsers(response.data)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  console.log(users)
  const userList = users.map((user, index) => {
    return (
      <CTableRow key={index}>
        <CTableHeaderCell scope="row">1</CTableHeaderCell>
        <CTableDataCell>{user?.firstName}</CTableDataCell>
        <CTableDataCell>{user?.lastName}</CTableDataCell>
        <CTableDataCell>{user?.username}</CTableDataCell>
        <CTableDataCell>{user?.email}</CTableDataCell>
        <CTableDataCell>
          {user?.enabled ? (
            <CBadge color="primary" shape="rounded-pill">
              Active
            </CBadge>
          ) : (
            <CBadge color="danger" shape="rounded-pill">
              Deactivated
            </CBadge>
          )}
        </CTableDataCell>
        <CTableDataCell>
          {user?.roles[0].name === 'ROLE_ADMIN' && (
            <CBadge color="primary" shape="rounded">
              ADMIN
            </CBadge>
          )}
          {user?.roles[0].name === 'ROLE_SELLER' && (
            <CBadge color="info" shape="rounded">
              SELLER
            </CBadge>
          )}
          {user?.roles[0].name === 'ROLE_DELIVERY' && (
            <CBadge color="secondary" shape="rounded">
              DELIVERY
            </CBadge>
          )}
          {user?.roles[0].name === 'ROLE_CUSTOMER' && (
            <CBadge color="success" shape="rounded">
              CUSTOMER
            </CBadge>
          )}
        </CTableDataCell>
        <CTableDataCell>
          <Link to={'/details/user/' + user.id} className="text-center m-1">
            Details
          </Link>
          <Link to={'/remove/user/' + user.id} className="text-center m-1">
            Remove
          </Link>
        </CTableDataCell>
      </CTableRow>
    )
  })
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>{isLoading ? 'Loading....' : userList}</CTableBody>
      </CTable>
    </>
  )
}

export default Users
