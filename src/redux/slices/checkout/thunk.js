import Swal from "sweetalert2";
import { Call } from "../../../hook/apiRequest"

export const startCreateOrder = (data, address, { billing, cfdi } = null, product) => {
    return async (dispatch) => {
        const dataObj = {
            transaction: data,
            address,
            product,
        };

        if (billing) {
            dataObj.billing = billing;
            dataObj.cfdi = cfdi;
        }

        const call = await Call(
            'payment',
            'POST',
            dataObj
        )

        if (call.success) {
            window.location.href = "/checkout/thanks"
            return
        }

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
            title: call.messageError,
        });
    }
}