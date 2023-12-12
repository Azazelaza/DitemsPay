import React, { useEffect } from "react";
import { SelectAddress } from "../../components/ui/SelectAddress";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { startGetAddressShipping, startSetAddress } from "../../redux/slices/address/thunk";

export default function Addresses() {
  const { address } = useSelector((state) => state.auth);
  const { address: selectAddress } = useSelector((state) => state.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addNewAddress = () => {
    navigate("/checkout/address?addNew=1");
  };

  const setAddress = (address) => {
    dispatch(startSetAddress(address));
  };

  useEffect(() => {
    dispatch(startGetAddressShipping())
  }, []);

  return (
    <div>
      <Row className="mx-4 pe-5 pt-4">
        <div className="d-flex">
          <h3 className="mb-5 w-50">Selecciona una direccion de envio</h3>
          <div className="w-50">
            <Button className="ms-auto d-block" onClick={() => addNewAddress()}>
              Añadir nueva dirección
            </Button>
          </div>
        </div>
        {address.map((add, key) => (
          <SelectAddress
            key={key}
            address={add}
            setAddress={setAddress}
            addressSelect={selectAddress.id}
          />
        ))}
        <div>
          <Button
            onClick={() => navigate("/checkout/finally")}
            className="ms-auto d-block"
          >
            Continuar
          </Button>
        </div>
      </Row>
    </div>
  );
}
