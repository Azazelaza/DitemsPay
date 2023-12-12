import React, { useEffect, useState } from "react";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { address } from "../../hook/validates/validations";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetStates,
  startPostAddress,
} from "../../redux/slices/address/thunk";
import { SelectForm } from "../../components/forms/SelectForm";

export default function Address() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(address) });
  const { id, address: addressState } = useSelector((state) => state.auth);
  const { states } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const addNew = new URLSearchParams(search).get("addNew");

  const sendForm = async(data) => {
    await dispatch(startPostAddress(data, id));
    navigate("/checkout/finally");
  };

  useEffect(() => {
    dispatch(startGetStates());
    if (addressState?.length && !addNew) {
      navigate("/checkout/finally");
    }
  }, []);

  return (
    <div>
      <Form className="me-4 pe-3" onSubmit={handleSubmit(sendForm)}>
        <Row className="pt-5">
          <h1 className="py-3 mb-5">Datos de Envio</h1>
          <Col xs={12}>
            <InputForm
              title="Calle"
              InputName="street"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Numero exterior"
              type="number"
              InputName="number_outside"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Numero interior (opcional)"
              type="number"
              InputName="number_inside"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Colonia"
              InputName="suburb"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <SelectForm
              title="Estado"
              InputName="state_id"
              options={states}
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Municipio/Ciudad"
              InputName="city"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Codigo postal"
              InputName="zip"
              type="number"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12}>
            <InputForm
              title="Notas"
              InputName="notes"
              register={register}
              errors={errors}
              rows={4}
              textArea={true}
            />
          </Col>
        </Row>
        <Button type="submit" className="float-end" variant="primary">
          Continuar
        </Button>
      </Form>
    </div>
  );
}
