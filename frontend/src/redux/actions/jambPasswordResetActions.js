import axios from 'axios'
import {
  JAMB_PASSWORD_RESET_CREATE_FAIL,
  JAMB_PASSWORD_RESET_CREATE_REQUEST,
  JAMB_PASSWORD_RESET_CREATE_SUCCESS,
  JAMB_PASSWORD_RESET_DETAILS_FAIL,
  JAMB_PASSWORD_RESET_DETAILS_REQUEST,
  JAMB_PASSWORD_RESET_DETAILS_SUCCESS,
  JAMB_PASSWORD_RESET_LIST_MY_REQUEST,
  JAMB_PASSWORD_RESET_LIST_MY_SUCCESS,
  JAMB_PASSWORD_RESET_LIST_MY_FAIL,
  JAMB_PASSWORD_RESET_LIST_REQUEST,
  JAMB_PASSWORD_RESET_LIST_SUCCESS,
  JAMB_PASSWORD_RESET_LIST_FAIL,
  JAMB_PASSWORD_RESET_UPDATE_REQUEST,
  JAMB_PASSWORD_RESET_UPDATE_SUCCESS,
  JAMB_PASSWORD_RESET_UPDATE_FAIL,
  JAMB_PASSWORD_RESET_DELETE_FAIL,
  JAMB_PASSWORD_RESET_DELETE_SUCCESS,
  JAMB_PASSWORD_RESET_DELETE_REQUEST,
} from '../constants/jambPasswordResetConstants'
import { creditWallet } from './userActions'
import { setMessage } from './utilActions'

export const createJambPasswordResetOrder = (order) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: JAMB_PASSWORD_RESET_CREATE_REQUEST,
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

    const { data } = await axios.post('/api/jambpasswordreset', order, config)

    dispatch({
      type: JAMB_PASSWORD_RESET_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    //rollback payment
    const { price, paymentMethod, paymentResult } = order
    dispatch(creditWallet(price, paymentMethod, paymentResult))
    dispatch({
      type: JAMB_PASSWORD_RESET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getJambPasswordResetOrderDetailsById = (id) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: JAMB_PASSWORD_RESET_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/jambpasswordreset/${id}`, config)

    dispatch({
      type: JAMB_PASSWORD_RESET_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: JAMB_PASSWORD_RESET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyJambPasswordResetOrders = (userId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: JAMB_PASSWORD_RESET_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let result

    if (userId) {
      const { data } = await axios.get(
        `/api/jambpasswordreset/myorders/${userId}`,
        config,
      )
      result = data
    } else {
      const { data } = await axios.get(
        '/api/jambpasswordreset/myorders',
        config,
      )
      result = data
    }

    dispatch({
      type: JAMB_PASSWORD_RESET_LIST_MY_SUCCESS,
      payload: result,
    })
  } catch (error) {
    dispatch({
      type: JAMB_PASSWORD_RESET_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateJambPasswordResetOrder = (orderId, order) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: JAMB_PASSWORD_RESET_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/jambpasswordreset/${orderId}/`,
      order,
      config,
    )

    dispatch({
      type: JAMB_PASSWORD_RESET_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: JAMB_PASSWORD_RESET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listJambPasswordResetOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: JAMB_PASSWORD_RESET_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/jambpasswordreset`, config)

    dispatch({
      type: JAMB_PASSWORD_RESET_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: JAMB_PASSWORD_RESET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteJambPasswordResetOrder = (id) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: JAMB_PASSWORD_RESET_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/jambpasswordreset/${id}`, config)

    dispatch({
      type: JAMB_PASSWORD_RESET_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: JAMB_PASSWORD_RESET_DELETE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}
