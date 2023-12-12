import Swal from "sweetalert2";
import { setLogin, logout, renew, endrenew } from "./authSlice"
import { Call } from "../../../hook/apiRequest";

export const startLoginUser = (data) => {
    return async (dispatch) => {
        dispatch(renew());

        const login = await Call(
            'user/login',
            'POST',
            data
        )
        if (login.success) {
            localStorage.setItem('token', login.token);
            dispatch(setLogin(login.user));
            dispatch(endrenew());
            return true;
        }
        else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'El correo o la contraseña es incorrecto'
            })
        }

        dispatch(renew());

        return false
    }
}
export const startRegisterUser = (data) => {
    return async (dispatch) => {
        dispatch(renew());

        const register = await Call(
            'user/register',
            'POST',
            data
        )
        if (register.success) {
            localStorage.setItem('token', register.user.token);
            dispatch(setLogin(register.user));
            dispatch(endrenew());
            return true;
        }
        else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Hubo un error al registrarse, puede que el correo que ingreso ya este en uso'
            })
        }

        dispatch(endrenew());

        return false
    }
}

export const checkUserLogin = () => {
    return async (dispatch) => {
        dispatch(renew());

        const login = await Call(
            'user/check',
            'POST',
            { 'remember_token': localStorage.getItem('token') ?? '' }
        )

        if (login.success) {
            localStorage.setItem('token', login.token);
            dispatch(setLogin(login.user))
            dispatch(endrenew());
            return true;
        } else {
            localStorage.clear();

            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Vuelve a iniciar sesión'
            })
        }

        dispatch(endrenew());
    }
}

export const startLogOut = () => {
    return async (dispatch) => {
        dispatch(renew());
        localStorage.removeItem('token')
        dispatch(logout());
    }
}