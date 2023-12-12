import React, { useEffect } from "react";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SelectForm } from "../../components/forms/SelectForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetStates,
  startPostBilling,
} from "../../redux/slices/address/thunk";
import { yupResolver } from "@hookform/resolvers/yup";
import { billing } from "../../hook/validates/validations";
import { FileForm } from "../../components/forms/FileForm";
import { FaArrowLeft, FaBars } from "react-icons/fa";

export default function Invoice() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(billing) });
  const { id, billing: addressUser } = useSelector((state) => state.auth);
  const { states } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendForm = async (data) => {
    await dispatch(startPostBilling(data, id));
    navigate("/checkout/finally");
  };

  const { tax_certificate } = watch(["tax_certificate"]);

  useEffect(() => {
    reset(addressUser[0]);
    dispatch(startGetStates());
  }, []);

  return (
    <div>
      <Form className="me-4 pe-3" onSubmit={handleSubmit(sendForm)}>
        <Row className="pt-5">
          <h6
            onClick={() => {
              sessionStorage.setItem("invoice", false);
              navigate("/checkout/finally");
            }}
          >
            <FaArrowLeft />
            Regresar
          </h6>
          <h1 className="py-3 mb-5">Datos de Facturación</h1>
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
          <Col xs={12}>
            <InputForm
              title="RFC"
              InputName="rfc"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12}>
            <InputForm
              title="Razon Social"
              InputName="business_name"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12}>
            {!!!tax_certificate && (
              <FileForm
                setValue={setValue}
                name="tax_certificate"
                text={"Constancia"}
                errors={errors}
              />
            )}
          </Col>
        </Row>
        <Button type="submit" className="float-end" variant="primary">
          Continuar
        </Button>
      </Form>
    </div>
  );
}
