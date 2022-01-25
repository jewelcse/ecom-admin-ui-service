import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
var axios = require('axios')
var qs = require('qs')

const Login = () => {
  const [username, setUsername] = useState(null)
  const [passsword, setPassword] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const loginHandler = () => {
    var data = qs.stringify({
      grant_type: 'password',
      username: username,
      password: passsword,
    })
    var config = {
      method: 'post',
      url: 'http://localhost:9191/oauth/token',
      headers: {
        Authorization: 'Basic d2ViOnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        setErrMessage(null)
        setSuccessMessage('Login SuccessFul')
        localStorage.setItem('admin_state', JSON.stringify(response.data))
      })
      .catch(function (error) {
        setErrMessage(error.response.data.error_description)
        setSuccessMessage(null)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard className="p-4">
              <CCardTitle className="text-center">
                <h1>Admin Login</h1>
              </CCardTitle>
              <CCardBody>
                <CForm>
                  {errMessage ? <p className="alert alert-danger">{errMessage}</p> : ''}
                  {successMessage ? <p className="alert alert-success">{successMessage}</p> : ''}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={usernameHandler}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={passwordHandler}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" onClick={() => loginHandler()}>
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
