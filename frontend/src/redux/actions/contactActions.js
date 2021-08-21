import axios from "axios"
import {
    CONTACT_CREATE_FAIL,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,

    CONTACT_DETAILS_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,


    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,

    CONTACT_LIST_BY_EMAIL_REQUEST,
    CONTACT_LIST_BY_EMAIL_SUCCESS,
    CONTACT_LIST_BY_EMAIL_FAIL,

    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_DELETE_REQUEST
} from "../constants/contactConstants"

import { setMessage } from "./utilActions"

export const createContact = (contact) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_CREATE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/contacts', contact, config)

        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const deleteContact = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_DELETE_REQUEST
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

        const { data } = await axios.delete(`/api/contacts/${id}`, config)

        dispatch({
            type: CONTACT_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: CONTACT_DELETE_FAIL,
            payload: message
        })
        dispatch(setMessage(message))
    }
}


export const getContactDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/contacts/${id}`, config)

        dispatch({
            type: CONTACT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONTACT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

export const listContacts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/contacts', config)

        dispatch({
            type: CONTACT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONTACT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}







export const listContactsByEmail = (email) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_LIST_BY_EMAIL_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/contacts/byemail/${email}`, config)

        dispatch({
            type: CONTACT_LIST_BY_EMAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CONTACT_LIST_BY_EMAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}