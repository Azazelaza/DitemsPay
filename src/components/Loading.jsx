import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <Spinner animation="border" className='m-auto d-block mt-5' variant="primary" />
  )
}
