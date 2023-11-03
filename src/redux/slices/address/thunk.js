import { Call } from "../../../hook/apiRequest";
import { setAddress, setStates } from "./slice";

export const startPostAddress = (data, id) => {
    return async (dispatch) => {
        await Call(
            `addressShipping`,
            'POST',
            { ...data, user_id: id, reference: 'not reference now' }
        )

        dispatch(setAddress({ ...data, user_id: id, reference: 'not reference now' }))
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


export const startSetAddress = (address) => {
    return async (dispatch) => {
        dispatch(setAddress(address));
    }
}
