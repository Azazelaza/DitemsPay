import React, { useState } from "react";
import { Form, InputGroup, Button, Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  startHiddenModal,
  startShowModal,
} from "../../../redux/slices/modal/thunk";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon } from "../../icons";
import styles from "../../../scss/components/modal/Login.module.scss";
import { startLoginUser } from "../../../redux/slices/authSlice/thunk";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../../hook/validates/validations";

export const LoginModal = () => {
  const { show, checking } = useSelector((state) => state.modal);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(login) });

  const handleClose = () => {
    dispatch(startHiddenModal());
  };

  const loginMail = (data) => {
    if (dispatch(startLoginUser(data))) {
      dispatch(startHiddenModal());
    }
  };

  return (
    <>
      <Modal
        show={show === "login"}
        onHide={handleClose}
        size="md"
        centered="true"
        className="modal-register-section"
      >
        <div className="image-background">
          <Modal.Header closeButton />
          <div className="register-modal m-auto w-75">
            <Image
              className="m-auto text-center d-block"
              width={"auto"}
              height={"100px"}
              src={"../../assets/logo/Ditems.png"}
            />
            <p className="text-center">
              Inicia sesión con tu correo electrónico y contraseña
            </p>
            <Form
              onSubmit={handleSubmit(loginMail)}
              className="input-groups-login m-auto"
            >
              <Form.Label className={styles.label}>
                Correo electrónico
              </Form.Label>
              <InputGroup>
                <Form.Control className={styles.input} {...register("email")} />
              </InputGroup>
              <Form.Label className={styles.label}>Contraseña</Form.Label>
              <Form.Control
                className={styles.input}
                {...{ ...register("password") }}
                type={showPass ? "text" : "password"}
              />
              <InputGroup.Text
                className={styles.showed}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOffIcon width="20px" />
                ) : (
                  <EyeIcon width="20px" />
                )}
              </InputGroup.Text>
              {Boolean(Object.keys(errors).length) && (
                <div className="alert alert-danger">
                  {Object.keys(errors).map((item) => (
                    <p>{errors[item].message}</p>
                  ))}
                </div>
              )}
              <Button
                disabled={checking}
                className={styles.buttonSession}
                type="submit"
                variant="fourth"
              >
                Iniciar Sesion
              </Button>
              <hr />
            </Form>
            <Button className={styles.buttonGoogle} disabled={checking}>
              <span className={styles.iconSocial}>
                <GoogleIcon width="15px" />
              </span>
              <span>Iniciar Sesion con Google</span>
            </Button>
            <Button className={styles.buttonFacebook} disabled={checking}>
              <span className={styles.iconSocial}>
                <FacebookIcon width="15px" />
              </span>
              <span>Iniciar Sesion con Facebook</span>
            </Button>
            <hr />
            <div className="d-flex justify-content-center">
              <p>¿No tienes cuenta?</p>
              <p
                className={styles.register}
                onClick={() => dispatch(startShowModal("register"))}
              >
                Regístrate
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
