import { useLocation } from "react-router-dom";
import { Call } from "../../../hook/apiRequest";
import { setMembership } from "./slice";

export const startGetMembershipProps = (membership_id) => {
    return async (dispatch) => {
        localStorage.removeItem('membership_id');
        localStorage.removeItem('product_id');
        const product = await Call(
            `membership/${membership_id}`,
            'GET',
        )

        if (product.success) {
            localStorage.setItem('membership_id', membership_id);
            dispatch(setMembership(product.data))
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