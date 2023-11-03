import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { startShowModal } from "../redux/slices/modal/thunk";
import styles from "../scss/pages/home.module.scss";
export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <Row className="text-center h-100">
        <Col className="mt-5 m-auto">
          <img src="/assets/logo/Ditems.png" width={350} alt="DitemsPay" />
          <h1>Bienvenido a DitemsPay</h1>
          <p
            className="cursor-pointer"
            onClick={() => dispatch(startShowModal("login"))}
          >
            <span className={styles.underline}> Inicia sesión</span> para ver
            el panel de usuario
          </p>
          <p>O</p>
          <p>Realiza tu compra en</p>
          <a href="https://pet-identity.com">PetID</a>
          <br />
          <a href="https://tag-tical.com">Tagtical</a>
          <br />
          <a href="https://hardcuino.com">Hardcuino</a>
          <br />
        </Col>
      </Row>
    </>
  );
}
