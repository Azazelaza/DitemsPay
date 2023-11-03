import React, { useState } from "react";
import { Form, InputGroup, Button, Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  startHiddenModal,
  startShowModal,
} from "../../../redux/slices/modal/thunk";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "../../icons";
import styles from "../../../scss/components/modal/Register.module.scss";
import { startRegisterUser } from "../../../redux/slices/authSlice/thunk";
import { validateRegister } from "../../../hook/validates/validations";
import { yupResolver } from "@hookform/resolvers/yup";

export const RegisterModal = () => {
  const { show, checking } = useSelector((state) => state.modal);
  const [showPass, setShowPass] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateRegister) });

  const handleClose = () => {
    dispatch(startHiddenModal());
  };

  const registerMail = (data) => {
    if (dispatch(startRegisterUser(data))) {
      dispatch(startHiddenModal());
    }
  };

  return (
    <>
      <Modal
        show={show === "register"}
        onHide={handleClose}
        size="md"
        centered="true"
        className="modal-login-section"
      >
        <div className="image-background">
          <Modal.Header closeButton />
          <div className="login-modal m-auto w-75">
            <Image
              className="m-auto text-center d-block"
              width={"auto"}
              height={"100px"}
              src={"../../assets/logo/Ditems.png"}
            />
            <Form
              onSubmit={handleSubmit(registerMail)}
              className="input-groups-login m-auto"
            >
              <Form.Label className={styles.label}>Nombre</Form.Label>
              <InputGroup>
                <Form.Control className={styles.input} {...register("name")} />
              </InputGroup>
              <Form.Label className={styles.label}>Apellido</Form.Label>
              <InputGroup>
                <Form.Control
                  className={styles.input}
                  {...register("last_name")}
                />
              </InputGroup>
              <Form.Label className={styles.label}>Celular</Form.Label>
              <InputGroup>
                <Form.Control
                  className={styles.input}
                  type="number"
                  {...register("phone")}
                />
              </InputGroup>
              <Form.Label className={styles.label}>
                Fecha de nacimiento
              </Form.Label>
              <InputGroup>
                <Form.Control
                  className={styles.input}
                  type="date"
                  {...register("birthday")}
                />
              </InputGroup>
              <Form.Label className={styles.label}>Genero</Form.Label>
              <InputGroup>
                <Form.Select className={styles.input} {...register("gender")}>
                  <option className="d-none">Especifica tu genero</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro..</option>
                </Form.Select>
              </InputGroup>
              <Form.Label className={styles.label}>
                Correo Electronico
              </Form.Label>
              <InputGroup>
                <Form.Control className={styles.input} {...register("email")} />
              </InputGroup>
              <Form.Label className={styles.label}>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  className={styles.input}
                  {...{ ...register("password") }}
                  type={!showPass ? "text" : "password"}
                />
              </InputGroup>
              <InputGroup.Text
                className={styles.showed}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeIcon width="20px" />
                ) : (
                  <EyeOffIcon width="20px" />
                )}
              </InputGroup.Text>
              <Button
                disabled={checking}
                className={styles.buttonSession}
                type="submit"
                variant="fourth"
              >
                Regístrate
              </Button>
            </Form>
            <hr />
            <div className="d-flex justify-content-center">
              <p>¿Ya tienes cuenta?</p>
              <p
                className={styles.register}
                onClick={() => dispatch(startShowModal("login"))}
              >
                Inicia Sesión
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
