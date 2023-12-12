import Swal from "sweetalert2";
import { Call, CallWithFormDataFile } from "../../../hook/apiRequest";
import { setAddress, setBilling, setCfdi, setStates } from "./slice";
import { setAddressUser } from "../authSlice/authSlice";

export const startGetAddressShipping = () => {
    return async (dispatch) => {
        const address = await Call(
            `addressShipping`,
            'GET',
        )
        dispatch(setAddressUser(address.data))
    }
}
export const startPostAddress = (data, id) => {
    return async (dispatch) => {
        await Call(
            `addressShipping`,
            'POST',
            { ...data, user_id: id, reference: 'not reference now' }
        )
        sessionStorage.setItem('address', JSON.stringify({ ...data, user_id: id, reference: 'not reference now' }))
        dispatch(setAddress({ ...data, user_id: id, reference: 'not reference now' }))
    }
}

export const startPostBilling = (data, id) => {
    return async (dispatch) => {
        await Call(
            `addressInvoice`,
            'POST',
            { ...data, user_id: id }
        )
        sessionStorage.setItem('cfdi_id', data.cfdi_id)
        dispatch(setBilling(data))
    }
}

export const startGetStates = () => {
    return async (dispatch) => {
        const states = await Call(
            `states`,
            'GET',
        )
        dispatch(setStates(states.data));
    }
}

export const startDeleteAddress = (id) => {
    return async (dispatch) => {

        Swal.fire({
            title: 'Seguro que quieres eliminarlo?',
            text: "Esta acción no se podra revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, Eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const address = await Call(
                    `addressShipping/${id}`,
                    'DELETE',
                )
                if (address.success) {
                    dispatch(startSetAddress({}));
                    dispatch(startGetAddressShipping());
                    Swal.fire(
                        'Eliminado!',
                        'El plan fue eliminado.',
                        'success'
                    )
                    return
                }
                Swal.fire(
                    'Ooops!',
                    'Ocurrio un error intentalo mas tarde.',
                    'error'
                )
            }
        })

    }
}

export const startGetCfdi = () => {
    return async (dispatch) => {
        const cfdi = await Call(
            `cfdi`,
            'GET',
        )
        dispatch(setCfdi(cfdi.data));
    }
}

export const startUploadTax = (file) => {
    return async (dispatch) => {
        const dataForm = new FormData();
        dataForm.set('tax_certificate', file);

        const data = await CallWithFormDataFile(
            `addressInvoice/uploadTaxCertificate`,
            'POST',
            dataForm
        )

        if (data.success) {
            return data.data
        }

        Swal.fire(
            'Ooops!',
            'Ocurrio un error intentalo mas tarde.',
            'error'
        )
        return
    }
}

export const startSetAddress = (address) => {
    return async (dispatch) => {
        sessionStorage.setItem('address', JSON.stringify(address))
        dispatch(setAddress(address));
    }
}
export const startSetBilling = (address) => {
    return async (dispatch) => {
        if (!!address) {
            dispatch(setBilling(address));
        }
    }
}
