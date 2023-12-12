import React from "react";
import { Form, Row } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "../../scss/components/ui/selectAddress.module.scss";
import { useDispatch } from "react-redux";
import { startDeleteAddress } from "../../redux/slices/address/thunk";

export const SelectAddress = ({ address, setAddress, addressSelect }) => {
  const dispatch = useDispatch();
  const deleteAddress = (id) => {
    dispatch(startDeleteAddress(id));
  };

  return (
    <label
      htmlFor={`radiusaddress-${address.id}`}
      onClick={() => setAddress(address)}
    >
      <Row className={styles.details}>
        <div className={styles.select}>
          <Form.Check type={"checkbox"} id={`radiusaddress-${address.id}`}>
            <Form.Check.Input
              type="radio"
              checked={addressSelect == address.id}
              readOnly
            />
          </Form.Check>
        </div>
        <div className={styles.data}>
          <p>
            {address.street} {address.number_outside} {address.suburb}{" "}
            {address.number_inside && "INT. " + address.number_inside}{" "}
            {address.city}, {address.state?.name}
          </p>
          <p>{address.notes}</p>
        </div>
        <div className={styles.edit} onClick={() => deleteAddress(address.id)}>
          <FaTrashAlt />
        </div>
      </Row>
    </label>
  );
};
