import axios from 'axios'
import {
  COCI_CREATE_FAIL,
  COCI_CREATE_REQUEST,
  COCI_CREATE_SUCCESS,
  COCI_DETAILS_FAIL,
  COCI_DETAILS_REQUEST,
  COCI_DETAILS_SUCCESS,
  COCI_LIST_MY_REQUEST,
  COCI_LIST_MY_SUCCESS,
  COCI_LIST_MY_FAIL,
  COCI_LIST_REQUEST,
  COCI_LIST_SUCCESS,
  COCI_LIST_FAIL,
  COCI_UPDATE_REQUEST,
  COCI_UPDATE_SUCCESS,
  COCI_UPDATE_FAIL,
  COCI_ITEM_DELIVER_REQUEST,
  COCI_ITEM_DELIVER_SUCCESS,
  COCI_ITEM_DELIVER_FAIL,
  COCI_DELETE_REQUEST,
  COCI_DELETE_SUCCESS,
  COCI_DELETE_FAIL,
  COCI_BLOB_REQUEST,
  COCI_BLOB_SUCCESS,
  COCI_BLOB_FAIL,
} from '../constants/changeOfCourseConstants'
import { creditWallet } from './userActions'
import { setMessage } from './utilActions'

export const getChangeOfCourseBlob = (orderId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: COCI_BLOB_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Accept: 'application/pdf',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/changeofcourseinstitution/${orderId}/blob`,
      { responseType: 'blob' },
      config,
    )

    const file = new Blob([data], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)

    dispatch({
      type: COCI_BLOB_SUCCESS,
      payload: fileURL,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: COCI_BLOB_FAIL,
      payload: message,
    })
  }
}

export const adminChangeOfCourseUpload = (id, formData) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: COCI_ITEM_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/changeofcourseinstitution/${id}/adminupload`,
      formData,
      config,
    )

    dispatch({
      type: COCI_ITEM_DELIVER_SUCCESS,
      payload: data,
    })

    dispatch(getChangeOfCourseBlob(id))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: COCI_ITEM_DELIVER_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const deleteChangeOfCourseOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COCI_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(
      `/api/changeofcourseinstitution/${id}`,
      config,
    )

    dispatch({
      type: COCI_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: COCI_DELETE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const createChangeOfCourseOrder = (order) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: COCI_CREATE_REQUEST,
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

    const { data } = await axios.post(
      '/api/changeofcourseinstitution',
      order,
      config,
    )

    dispatch({
      type: COCI_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    //rollback payment
    const { price, paymentMethod, paymentResult } = order
    dispatch(creditWallet(price, paymentMethod, paymentResult))
    dispatch({
      type: COCI_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getChangeOfCourseOrderDetailsById = (id) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: COCI_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/changeofcourseinstitution/${id}`,
      config,
    )

    dispatch({
      type: COCI_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COCI_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyChangeOfCourseOrders = (userId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: COCI_LIST_MY_REQUEST,
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
        `/api/changeofcourseinstitution/myorders/${userId}`,
        config,
      )
      result = data
    } else {
      const { data } = await axios.get(
        '/api/changeofcourseinstitution/myorders',
        config,
      )
      result = data
    }

    dispatch({
      type: COCI_LIST_MY_SUCCESS,
      payload: result,
    })
  } catch (error) {
    dispatch({
      type: COCI_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateChangeOfCourseOrder = (orderId, order) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: COCI_UPDATE_REQUEST,
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
      `/api/changeofcourseinstitution/${orderId}/`,
      order,
      config,
    )

    dispatch({
      type: COCI_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COCI_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listChangeOfCourseOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COCI_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/changeofcourseinstitution`, config)

    dispatch({
      type: COCI_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COCI_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
