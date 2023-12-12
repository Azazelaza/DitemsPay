import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Thanks() {
  const { name } = useSelector((state) => state.product);
  return (
    <div>
      <Row>
        <p className="text-center m-auto d-block">
          Gracias por tu pedido en DITEMSPAY
        </p>
        <p className="text-center m-auto d-block">Compraste:  {name}</p>
        <p className="text-center m-auto d-block">
          Llegaran los datos de envio y producto a tu correo electronico
        </p>
        {/* <p className='text-center m-auto d-block'>
                    Puedes ver mas detalles de tu pedido dando click <a href="#">aqui</a>
                </p> */}
      </Row>
    </div>
  );
}
