import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startSetAddress } from "../../redux/slices/address/thunk";
import { FaPencilAlt, FaTruck, FaUser } from "react-icons/fa";
import styles from "../../scss/pages/finally.module.scss";
export default function Finally() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { address, billing } = useSelector((state) => state.address);
  const {
    username,
    email,
    phone,
    address: addressState,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendForm = (data) => {
    navigate("/thanks");
  };

  useEffect(() => {
    if (address) {
      if (addressState.length) {
        dispatch(startSetAddress(addressState[0]));
      } else {
        navigate("/checkout/address");
      }
    }
  }, []);

  return (
    <div>
      <Form className="mx-4 pe-5" onSubmit={handleSubmit(sendForm)}>
        <Row className="pt-3">
          <h3 className="py-3 mb-4" style={{ fontFamily: "sans-serif" }}>
            Revisa y confirma tu compra
          </h3>
          <h6 className="mb-4">Detalles de usuario</h6>
          <Row className={styles.details}>
            <div className={styles.icon}>
              <FaUser />
            </div>
            <div className={styles.data}>
              <p>{username}</p>
              <p>
                {email} - {phone}
              </p>
            </div>
            <div className={styles.edit}></div>
          </Row>
          <h6 className="mb-4">Dirección de envio</h6>
          <Row className={styles.details}>
            <div className={styles.icon}>
              <FaTruck />
            </div>
            <div className={styles.data}>
              <p>
                {address.street} {address.number_outside} {address.suburb}{" "}
                {address.number_inside && "INT. " + address.number_inside}{" "}
                {address.city}, {address.state?.name}
              </p>
              <p>{address.notes}</p>
            </div>
            <div className={styles.edit}>
              <FaPencilAlt />
            </div>
          </Row>
          {billing && (
            <Col xs={12}>
              <Card>
                <Card.Title>Facturación</Card.Title>
                <Card.Body>
                  <p>Calle Sample 2421 Colonia Guadalajara, Mexíco C.P 22450</p>
                  <p>Uso de CFDI</p>
                </Card.Body>
              </Card>
            </Col>
          )}

          <Wallet initialization={{ preferenceId: 44 }} />

          <Col xs={12}>
            {/* <InputForm
                            title='Uso de CFDI'
                            InputName='name'
                            register={register}
                            errors={errors}
                        /> */}

            <p>
              *El metodo de pago se hara con mercado pago dentro de este se
              podra pagar con tarjeta de credito, debito, efectivo, paypal o
              transferencia
            </p>
          </Col>
        </Row>
        <Button type="submit" className="float-end" variant="primary">
          Finalizar pedido
        </Button>
      </Form>
    </div>
  );
}
