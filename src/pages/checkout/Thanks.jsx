import React from 'react'
import { Row } from 'react-bootstrap'

export default function Thanks() {
    return (
        <div>
            <Row>
                <p className='text-center m-auto d-block'>
                    Gracias por tu pedido en PETID con DITEMSPAY
                </p>
                <p className='text-center m-auto d-block'>
                    Llegaran los datos de envio a tu correo electronico
                </p>
                <p className='text-center m-auto d-block'>
                    Puedes ver mas detalles de tu pedido dando click <a href="#">aqui</a>
                </p>
            </Row>
        </div>
    )
}
