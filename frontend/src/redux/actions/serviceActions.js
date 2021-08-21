import axios from 'axios'
import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,

  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,

  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_CREATE_FAIL,

  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_FAIL,

  SERVICE_BY_NAME_REQUEST,
  SERVICE_BY_NAME_SUCCESS,
  SERVICE_BY_NAME_FAIL
} from '../constants/serviceConstants'
import { logout } from './userActions'
import { setMessage } from './utilActions'

export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST })

    const { data } = await axios.get(`/api/services`)

    dispatch({
      type: SERVICE_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listServiceDetailsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/services/${id}`)

    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const listServiceByName = (name) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_BY_NAME_REQUEST })

    const { data } = await axios.get(`/api/services/name/${name}`)

    dispatch({
      type: SERVICE_BY_NAME_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SERVICE_BY_NAME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const createService = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/services/`, {}, config)

    dispatch({
      type: SERVICE_CREATE_SUCCESS,
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
      type: SERVICE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateService = (service) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/services/${service._id}`, service, config)

    dispatch({
      type: SERVICE_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch(listServiceByName(service.name))
    dispatch(setMessage("Service updated"))

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SERVICE_UPDATE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

