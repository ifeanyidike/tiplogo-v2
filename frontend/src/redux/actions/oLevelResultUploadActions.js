import axios from 'axios'
import {
  OLEVEL_UPLOAD_CREATE_FAIL,
  OLEVEL_UPLOAD_CREATE_REQUEST,
  OLEVEL_UPLOAD_CREATE_SUCCESS,
  OLEVEL_UPLOAD_DETAILS_FAIL,
  OLEVEL_UPLOAD_DETAILS_REQUEST,
  OLEVEL_UPLOAD_DETAILS_SUCCESS,
  OLEVEL_UPLOAD_LIST_MY_REQUEST,
  OLEVEL_UPLOAD_LIST_MY_SUCCESS,
  OLEVEL_UPLOAD_LIST_MY_FAIL,
  OLEVEL_UPLOAD_LIST_REQUEST,
  OLEVEL_UPLOAD_LIST_SUCCESS,
  OLEVEL_UPLOAD_LIST_FAIL,
  OLEVEL_UPLOAD_UPDATE_REQUEST,
  OLEVEL_UPLOAD_UPDATE_SUCCESS,
  OLEVEL_UPLOAD_UPDATE_FAIL,
  OLEVEL_UPLOAD_ITEM_DELIVER_REQUEST,
  OLEVEL_UPLOAD_ITEM_DELIVER_SUCCESS,
  OLEVEL_UPLOAD_ITEM_DELIVER_FAIL,
  OLEVEL_UPLOAD_DELETE_REQUEST,
  OLEVEL_UPLOAD_DELETE_SUCCESS,
  OLEVEL_UPLOAD_DELETE_FAIL,
  OLEVEL_UPLOAD_BLOB_REQUEST,
  OLEVEL_UPLOAD_BLOB_SUCCESS,
  OLEVEL_UPLOAD_BLOB_FAIL,
} from '../constants/oLevelResultUploadConstants'
import { creditWallet } from './userActions'
import { setMessage } from './utilActions'

export const getOlevelUploadBlob = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_BLOB_REQUEST,
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
      `/api/olevelresultupload/${orderId}/blob`,
      { responseType: 'blob' },
      config,
    )
    const file = new Blob([data], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)

    dispatch({
      type: OLEVEL_UPLOAD_BLOB_SUCCESS,
      payload: fileURL,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: OLEVEL_UPLOAD_BLOB_FAIL,
      payload: message,
    })
  }
}

export const adminOlevelFileUpload = (id, formData) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_ITEM_DELIVER_REQUEST,
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
      `/api/olevelresultupload/${id}/adminupload`,
      formData,
      config,
    )

    dispatch({
      type: OLEVEL_UPLOAD_ITEM_DELIVER_SUCCESS,
      payload: data,
    })

    dispatch(getOlevelUploadOrderDetailsById(id))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: OLEVEL_UPLOAD_ITEM_DELIVER_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const deleteOlevelUploadOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/olevelresultupload/${id}`, config)

    dispatch({
      type: OLEVEL_UPLOAD_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: OLEVEL_UPLOAD_DELETE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const createOlevelUploadOrder = (
  orderItems,
  amount,
  paymentMethod,
  paymentResult,
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_CREATE_REQUEST,
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
    const formData = new FormData()
    console.log(orderItems.subjectUpload)

    orderItems.files.forEach((file) => formData.append('document', file))
    formData.append('type', orderItems.type)
    formData.append('name', orderItems.name)
    formData.append('profileCode', orderItems.profileCode)
    formData.append('schoolAttended', orderItems.schoolAttended)
    formData.append('schoolType', orderItems.schoolType)
    formData.append('subjectUpload', JSON.stringify(orderItems.subjectUpload))
    formData.append('price', amount)
    formData.append('paymentMethod', paymentMethod)
    formData.append('paymentResultId', paymentResult.id)
    formData.append('paymentResultStatus', paymentResult.status)
    formData.append('paymentResultUpdateTime', paymentResult.update_time)
    formData.append('paymentResultEmail', paymentResult.email)

    const { data } = await axios.post(
      '/api/olevelresultupload',
      formData,
      config,
    )

    dispatch({
      type: OLEVEL_UPLOAD_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    //rollback payment
    dispatch(creditWallet(amount, paymentMethod, paymentResult))
    dispatch({
      type: OLEVEL_UPLOAD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOlevelUploadOrderDetailsById = (id) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/olevelresultupload/${id}`, config)

    dispatch({
      type: OLEVEL_UPLOAD_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OLEVEL_UPLOAD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOlevelUploadOrders = (userId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_LIST_MY_REQUEST,
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
        `/api/olevelresultupload/myorders/${userId}`,
        config,
      )
      result = data
    } else {
      const { data } = await axios.get(
        '/api/olevelresultupload/myorders',
        config,
      )
      result = data
    }

    dispatch({
      type: OLEVEL_UPLOAD_LIST_MY_SUCCESS,
      payload: result,
    })
  } catch (error) {
    dispatch({
      type: OLEVEL_UPLOAD_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateOlevelUploadOrder = (orderId, order) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_UPDATE_REQUEST,
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
      `/api/olevelresultupload/${orderId}/`,
      order,
      config,
    )

    dispatch({
      type: OLEVEL_UPLOAD_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OLEVEL_UPLOAD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOlevelUploadOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: OLEVEL_UPLOAD_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/olevelresultupload`, config)

    dispatch({
      type: OLEVEL_UPLOAD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OLEVEL_UPLOAD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
