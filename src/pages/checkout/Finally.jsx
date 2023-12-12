import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetCfdi,
  startSetAddress,
  startSetBilling,
} from "../../redux/slices/address/thunk";
import {
  FaFileInvoiceDollar,
  FaPencilAlt,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import styles from "../../scss/pages/finally.module.scss";
import { startCreateOrder } from "../../redux/slices/checkout/thunk";
import CardPaymentMP from "../../components/ui/CardPayment";
import Swal from "sweetalert2";

export default function Finally() {
  const [billing, setBilling] = useState(
    sessionStorage.getItem("invoice") == "true" ? true : false
  );
  const [cfdi, setCfdi] = useState(0);
  const {
    address,
    billing: addressInvoice,
    cfdi: cfdis,
  } = useSelector((state) => state.address);
  const {
    username,
    email,
    phone,
    address: addressesUser,
    billing: billingUser,
  } = useSelector((state) => state.auth);
  const { name, price, image, quantity } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(address).length) {
      if (addressesUser?.length) {
        dispatch(startSetAddress(addressesUser[0]));
      } else {
        navigate("/checkout/address");
      }
    }

    dispatch(startGetCfdi());
  }, []);

  useEffect(() => {
    if (!Object.keys(addressInvoice).length) {
      dispatch(startSetBilling(billingUser[0]));
    }

    if (billing && !billingUser.length) {
      navigate("/checkout/invoice");
    }
  }, [billing]);

  const createOrder = (data) => {
    if (billing && !cfdi) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Selecciona el cfdi correspondiente",
      });
    }
    dispatch(
      startCreateOrder(
        data,
        address,
        {
          billing: billing,
          address: addressInvoice,
          rfc: addressInvoice?.rfc,
          cfdi: cfdi,
        },
        {
          product: { name, price, image, quantity },
        }
      )
    );
  };

  return (
    <div>
      <Row className="mx-4 pe-5">
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
            <div
              className={styles.edit}
              onClick={() => navigate("/checkout/addresses")}
            >
              <FaPencilAlt />
            </div>
          </Row>
          <Row className="mb-4">
            <h6 className="w-auto">Facturación</h6>
            <Form.Check
              type="switch"
              className="w-auto"
              checked={billing}
              onChange={(data) => {
                setBilling(data.target.checked);
                sessionStorage.setItem("invoice", data.target.checked);
              }}
              id="custom-switch"
            />
          </Row>
          {Boolean(billing && Object.keys(addressInvoice).length) && (
            <>
              <Row className={styles.details}>
                <div className={styles.icon}>
                  <FaFileInvoiceDollar />
                </div>
                <div className={styles.data}>
                  <p>
                    {addressInvoice?.street} {addressInvoice?.number_outside}{" "}
                    {addressInvoice?.suburb}{" "}
                    {addressInvoice?.number_inside &&
                      "INT. " + addressInvoice?.number_inside}{" "}
                    {addressInvoice?.city}, {addressInvoice?.state?.name}
                  </p>
                  <p>{addressInvoice?.notes}</p>
                </div>
                <div
                  className={styles.edit}
                  onClick={() => navigate("/checkout/invoice")}
                >
                  <FaPencilAlt />
                </div>
              </Row>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Selecciona tu Cfdi</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Select
                      onChange={(t) => setCfdi(t.target.value)}
                      value={cfdi}
                    >
                      <option className="d-none">
                        Selecciona una opcion...
                      </option>
                      {cfdis.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>
            </>
          )}

          {billing && !cfdi ? (
            <>Selecciona tu cfdi para continuar con la compra</>
          ) : (
            <CardPaymentMP
              createOrder={createOrder}
              price={price}
              email={email}
            />
          )}
        </Row>
      </Row>
    </div>
  );
}
