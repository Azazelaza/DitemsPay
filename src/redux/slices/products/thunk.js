import Swal from "sweetalert2";
import { Call } from "../../../hook/apiRequest";
import { setProduct } from "./slice";

export const startGetProductProps = (product_id) => {
    return async (dispatch) => {
        localStorage.removeItem('product_id');
        localStorage.removeItem('membership_id');
        const product = await Call(
            `product/${product_id}`,
            'GET',
        )

        if (product.success) {
            localStorage.setItem('product_id', product_id);
            dispatch(setProduct(product.data))
        } else {
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

            window.location.href = '/';
        }

    }
}