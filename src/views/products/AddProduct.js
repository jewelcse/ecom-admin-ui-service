import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardHeader,
  CCol,
  CForm,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const AddProduct = () => {
  return (
    <>
      <CCard style={{ width: '100%', padding: '5px' }}>
        <CCardBody>
          <CCardTitle>Add Product</CCardTitle>
          <CRow className="mb-3">
            <CFormLabel htmlFor="title" className="col-sm-2 col-form-label">
              Product title
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="text" id="title" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="formFileMultiple" className="col-sm-2 col-form-label">
              Product Images
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="file" id="formFileMultiple" multiple />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="overview" className="col-sm-2 col-form-label">
              Product Overview
            </CFormLabel>
            <CCol sm={10}>
              <CFormTextarea type="text" id="overview" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="description" className="col-sm-2 col-form-label">
              Product Description
            </CFormLabel>
            <CCol sm={10}>
              <CFormTextarea type="text" row="6" id="description" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="oprice" className="col-sm-2 col-form-label">
              Product Original Price
            </CFormLabel>
            <CCol sm={4}>
              <CFormInput type="number" id="oprice" />
            </CCol>
            <CFormLabel htmlFor="discount" className="col-sm-2 col-form-label">
              Has Discount?
            </CFormLabel>
            <CCol sm={4}>
              <CFormInput type="number" id="discount" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="oprice" className="col-sm-2 col-form-label">
              Select Category
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect aria-label="Default select example">
                <option>Select Category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="oprice" className="col-sm-2 col-form-label">
              Select Seller
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect aria-label="Default select example">
                <option>Select Seller</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddProduct
