import {
    MESSAGE_SET
} from "../constants/utilConstants"

export const toggleDrawer = () => async (dispatch) => {

}

export const setMessage = (message) => dispatch => {
    dispatch({
        type: MESSAGE_SET,
        payload: message
    })
}