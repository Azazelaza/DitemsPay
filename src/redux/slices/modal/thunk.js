import { hiddenModal, showModal } from "./slice";

export const startShowModal = (name) => {
    return async (dispatch) => {
        dispatch(showModal({ name }));
    }
}
export const startHiddenModal = () => {
    return async (dispatch) => {
        dispatch(hiddenModal());
    }
}