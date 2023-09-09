import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loadingspinner() {
  return (
    <div className='d-flex justify-content-center align-items-center m-5 fw-bolder fs-4 '>
         <Spinner animation="grow" variant="light" className='me-3' />  Loading...
    </div>
  )
}

export default Loadingspinner