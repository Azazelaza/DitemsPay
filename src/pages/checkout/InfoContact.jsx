import React, { useEffect } from "react";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectForm } from "../../components/forms/SelectForm";
import { startRegisterUser } from "../../redux/slices/authSlice/thunk";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRegister } from "../../hook/validates/validations";

export default function InfoContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateRegister) });
  const { status, id } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status == "auth") {
      navigate("/checkout/address");
    }
  }, [status]);

  const sendForm = (data) => {
    if (dispatch(startRegisterUser(data))) {
      navigate("/checkout/address");
    }
  };

  return (
    <div>
      <Form className="me-4 pe-3" onSubmit={handleSubmit(sendForm)}>
        <Row className="pt-5">
          <h1 className="py-3 mb-5">Registrate para continuar</h1>
          <Col xs={6}>
            <InputForm
              title="Nombre"
              InputName="name"
              place="Nombre completo"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Apellido"
              InputName="last_name"
              place="Apellidos"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Email"
              InputName="email"
              place="Nombre completo"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Celular"
              InputName="phone"
              place="10 dígitos"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Fecha de nacimiento"
              type="date"
              InputName="birthday"
              place="DD/MM/YYYY"
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <SelectForm
              title="Genero"
              InputName="gender"
              options={[
                { value: "male", name: "Masculino" },
                { value: "female", name: "Femenino" },
                { value: "other", name: "Otro" },
              ]}
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <InputForm
              title="Contraseña"
              InputName="password"
              type="password"
              place="***********"
              register={register}
              errors={errors}
            />
          </Col>
        </Row>
        <Button type="submit" className="float-end w-25" variant="primary">
          Continuar
        </Button>
      </Form>
    </div>
  );
}
