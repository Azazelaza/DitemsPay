import React from 'react'
import { InputForm } from '../../components/Forms/InputForm'
import { useForm } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Invoice() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();

  const sendForm = (data) => {
    console.log(data);
    navigate('/checkout/finally');
  }

  return (
    <div>
      <Form className='me-4 pe-3' onSubmit={handleSubmit(sendForm)}>
        <Row className='pt-5'>
          <h1 className='py-3 mb-5'>Datos de Facturación</h1>

          <Col xs={12}>
            <InputForm
              title='Razon Social'
              InputName='street'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12}>
            <InputForm
              title='Uso de CFDI'
              InputName='name'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12}>
            <Form.Check type={'radio'}>
              <Form.Check.Input type={'radio'} isValid />
              <Form.Check.Label>Dirección de facturación</Form.Check.Label>
            </Form.Check>
            <Form.Check type={'radio'}>
              <Form.Check.Input type={'radio'} isValid />
              <Form.Check.Label>Misma dirección que envio</Form.Check.Label>
            </Form.Check>
          </Col>
          <Col xs={12}>
            <InputForm
              title='Calle'
              InputName='street'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title='Colonia'
              InputName='name'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title='Estado'
              InputName='name'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title='Municipio/Ciudad'
              InputName='email'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title='Codigo postal'
              InputName='email'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title='Numero interior'
              InputName='name'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title='Numero exterior'
              InputName='name'
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12}>
            <InputForm
              title='Constancia de situación fiscal'
              InputName='name'
              type='file'
              register={register}
              errors={errors}
            />
          </Col>
        </Row>
        <Button type='submit' className='float-end' variant='primary'>Continuar</Button>
      </Form>
    </div>
  )
}
