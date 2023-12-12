import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import React, { memo } from "react";

const CardPaymentMP = ({ createOrder, price, email }) => {
  initMercadoPago("TEST-4c43ab64-5f47-4995-b3b6-f2fda75ff7a3", {
    locale: "es-MX",
  });

  if (price == 0 || email == "") {
    return <></>;
  }
  return (
    <div>
      <CardPayment
        initialization={{
          preferenceId: 44,
          amount: (parseFloat(price) + 150).toFixed(2),
          payer: {
            email: email,
          },
        }}
        customization={{
          paymentMethods: {
            maxInstallments: 1,
          },
        }}
        onError={(error) => {
          console.log(error);
        }}
        onSubmit={(data) => createOrder(data)}
      />
    </div>
  );
};

export default memo(CardPaymentMP);
