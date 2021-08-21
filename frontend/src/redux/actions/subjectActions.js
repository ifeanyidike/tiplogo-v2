import axios from 'axios'
import {
    SUBJECT_LIST_REQUEST,
    SUBJECT_LIST_SUCCESS,
    SUBJECT_LIST_FAIL,

    SUBJECT_CREATE_REQUEST,
    SUBJECT_CREATE_SUCCESS,
    SUBJECT_CREATE_FAIL,
} from '../constants/subjectConstants'
import { logout } from './userActions'
import { setMessage } from './utilActions'

export const listSubjects = () => async (dispatch) => {
    try {
        dispatch({ type: SUBJECT_LIST_REQUEST })

        const { data } = await axios.get(`/api/subjects`)

        dispatch({
            type: SUBJECT_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: SUBJECT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}




export const createSubject = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBJECT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/subjects/`, {}, config)

        dispatch({
            type: SUBJECT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: SUBJECT_CREATE_FAIL,
            payload: message,
        })
    }
}

