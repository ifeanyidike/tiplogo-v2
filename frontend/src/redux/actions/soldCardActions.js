import axios from "axios"
import {
    CARD_MY_FAIL,
    CARD_MY_REQUEST,
    CARD_MY_SUCCESS,
    SOLD_CARD_CREATE_FAIL,
    SOLD_CARD_CREATE_REQUEST,
    SOLD_CARD_CREATE_SUCCESS,

} from "../constants/soldCardConstants"

export const createSoldCard = (cardId, purchasedItems) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SOLD_CARD_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const userId = userInfo._id

        const { data } = await axios.post(`/api/cards/sold/${cardId}/${userId}`,
            { purchasedItems }, config)

        dispatch({
            type: SOLD_CARD_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SOLD_CARD_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const listMyCards = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CARD_MY_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/cards/sold/${userId}`, config)

        dispatch({
            type: CARD_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CARD_MY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}