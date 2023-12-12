import React, { useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import styles from "../../scss/components/layout/ContainCheckout.module.scss";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { startGetProductProps } from "../../redux/slices/products/thunk";
import { startGetMembershipProps } from "../../redux/slices/membership/thunk";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ContainCheckout({ children }) {
  const { name, price, image, quantity } = useSelector(
    (state) => state.product
  );
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const product =
      new URLSearchParams(search).get("product_id") ??
      localStorage.getItem("product_id");
    const membership =
      new URLSearchParams(search).get("membership_id") ??
      localStorage.getItem("membership_id");

    if (!!product) {
      dispatch(startGetProductProps(product));
    } else if (!!membership) {
      dispatch(startGetMembershipProps(product));
    }

    if (!!!product && !!!membership) {
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
        title: "Agrega una membresia o producto validos",
      });
      navigate("/");
    }
  }, []);

  return (
    <>
      <Row>
        <Col xs={7} className={styles.data}>
          <Header />
          <div>{children}</div>
        </Col>
        <Col xs={5} className={styles.contain}>
          <div className={styles.products}>
            <div>
              <h1>{name}</h1>
              <p>
                <span className={styles.price}>${price}</span>{" "}
                <span className={styles.quantity}>{quantity} Unidad</span>
              </p>
              <p></p>
            </div>
            <Image className={styles.productimage} src={image} />
          </div>
          <div className={styles.products}>
            <h4>
              Precio de envio: <span>$150</span>
            </h4>
          </div>
          <div className={styles.products}>
            <h4>
              Precio total: <span>${(parseFloat(price) + 150.00).toFixed(2)}</span>
            </h4>
          </div>
        </Col>
      </Row>
    </>
  );
}
