import React from "react";
import { Button, Col, Dropdown, Image, Row } from "react-bootstrap";
import { AvatarApp } from "../ui/AvatarApp";
import styles from "../../scss/components/layout/Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { startShowModal } from "../../redux/slices/modal/thunk";
import { startLogOut } from "../../redux/slices/authSlice/thunk";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, status } = useSelector((state) => state.auth);
  return (
    <>
      <Row>
        <Col xs={6}>
          <a href="/checkout">
            <Image
              width={"auto"}
              height={"150px"}
              src={"../../assets/logo/Ditems.png"}
            />
          </a>
        </Col>
        <Col xs={6} className="m-auto">
          <div className="mt-4 d-block text-end">
            {status == "auth" ? (
              <div className="d-flex m-auto justify-content-end align-items-center">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className={"d-flex " + styles.dropdown}
                  >
                    <h5 className="my-auto">{username}</h5>
                    <div className="d-block text-center">
                      <AvatarApp maxHeight={50} />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('/')}>Perfil</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(startLogOut())}>
                      Salir
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <>
                No has iniciado sesion <br />
                ¿Quieres iniciar sesión? <br />
                <Button
                  variant="link"
                  onClick={() => dispatch(startShowModal("login"))}
                  className="text-underline"
                  to="/login"
                >
                  Da click aqui
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
