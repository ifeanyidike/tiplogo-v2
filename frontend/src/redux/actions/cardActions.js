import axios from 'axios'
import {
  CARD_LIST_REQUEST,
  CARD_LIST_SUCCESS,
  CARD_LIST_FAIL,
  CARD_DETAILS_REQUEST,
  CARD_DETAILS_SUCCESS,
  CARD_DETAILS_FAIL,
  CARD_DELETE_SUCCESS,
  CARD_DELETE_REQUEST,
  CARD_DELETE_FAIL,
  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARD_CREATE_FAIL,
  CARD_UPDATE_REQUEST,
  CARD_UPDATE_SUCCESS,
  CARD_UPDATE_FAIL,
  CARD_LIST_FEW_REQUEST,
  CARD_LIST_FEW_SUCCESS,
  CARD_LIST_FEW_FAIL,
  CARD_ITEM_DELIVER_REQUEST,
  CARD_ITEM_DELIVER_SUCCESS,
  CARD_ITEM_DELIVER_FAIL,
  CARD_ADD_ITEM_SUCCESS,
  CARD_ADD_ITEM_FAIL,
  CARD_ADD_ITEM_REQUEST,
} from '../constants/cardConstants'
import { logout } from './userActions'
import { cardDeliverOrder } from './cardOrderActions'
import { setMessage } from './utilActions'

export const listCards = (keyword = '', pageNumber = '') => async (
  dispatch,
) => {
  try {
    dispatch({ type: CARD_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/cards?keyword=${keyword}&pageNumber=${pageNumber}`,
    )

    dispatch({
      type: CARD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCardDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CARD_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/cards/${id}`)

    dispatch({
      type: CARD_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listFewCards = (num) => async (dispatch) => {
  try {
    dispatch({ type: CARD_LIST_FEW_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/api/cards/few/${num}`, config)

    dispatch({
      type: CARD_LIST_FEW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_LIST_FEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCard = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARD_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cards/${id}`, config)

    dispatch({
      type: CARD_DELETE_SUCCESS,
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
      type: CARD_DELETE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const createCard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARD_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/cards`, {}, config)

    dispatch({
      type: CARD_CREATE_SUCCESS,
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
      type: CARD_CREATE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const updateCard = (id, card) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARD_UPDATE_REQUEST,
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
    console.log(card)
    const { data } = await axios.put(`/api/cards/${id}`, card, config)

    dispatch({
      type: CARD_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch(listCardDetails(id))
    dispatch(setMessage('Card Updated Successfully'))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CARD_UPDATE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const deliverCardItems = (numItems, id, orderId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({ type: CARD_ITEM_DELIVER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/api/cards/${id}/items`,
      { numItems },
      config,
    )

    dispatch({
      type: CARD_ITEM_DELIVER_SUCCESS,
      payload: data,
    })

    if (data) {
      dispatch(cardDeliverOrder(orderId, data.purchasedItems, id))
    }
  } catch (error) {
    dispatch({
      type: CARD_ITEM_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addCardItems = (id, items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARD_ADD_ITEM_REQUEST,
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
      `/api/cards/${id}/items`,
      { items },
      config,
    )

    dispatch({
      type: CARD_ADD_ITEM_SUCCESS,
      payload: data,
    })
    dispatch(listCardDetails(id))
    dispatch(setMessage('Card item added successfully'))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CARD_ADD_ITEM_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}
