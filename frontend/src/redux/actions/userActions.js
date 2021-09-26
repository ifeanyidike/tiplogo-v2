import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_CONFIRM_EMAIL_REQUEST,
  USER_CONFIRM_EMAIL_SUCCESS,
  USER_CONFIRM_EMAIL_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAIL,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_RESEND_CODE_REQUEST,
  USER_RESEND_CODE_SUCCESS,
  USER_RESEND_CODE_FAIL,
  USER_PROFILE_PHOTO_REQUEST,
  USER_PROFILE_PHOTO_SUCCESS,
  USER_PROFILE_PHOTO_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  SET_PROFILE_IMAGE,
  WALLET_DEBIT_REQUEST,
  WALLET_DEBIT_SUCCESS,
  WALLET_DEBIT_FAIL,
  WALLET_CREDIT_REQUEST,
  WALLET_CREDIT_SUCCESS,
  WALLET_CREDIT_FAIL,
  USERS_LIST_FAIL,
  USERS_LIST_SUCCESS,
  USERS_LIST_REQUEST,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_MAKEADMIN_FAIL,
  USER_MAKEADMIN_SUCCESS,
  USER_MAKEADMIN_REQUEST,
  USER_EMAIL_REQUEST,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_FAIL,
  USERS_EMAIL_REQUEST,
  USERS_EMAIL_SUCCESS,
  USERS_EMAIL_FAIL,
  USER_EMAIL_BY_EMAIL_REQUEST,
  USER_EMAIL_BY_EMAIL_SUCCESS,
  USER_EMAIL_BY_EMAIL_FAIL,
  WALLET_AMOUNT_REQUEST,
  WALLET_AMOUNT_SUCCESS,
  WALLET_AMOUNT_FAIL,
  USER_MAKEEDITOR_REQUEST,
  USER_MAKEEDITOR_SUCCESS,
  USER_MAKEEDITOR_FAIL,
  GET_ANNOUNCEMENT,
  SAVE_ANNOUNCEMENT_SUCCESS,
  SAVE_ANNOUNCEMENT_FAIL,
} from '../constants/userConstants'
import uuid from 'react-uuid'
import { cardPayOrder } from './cardOrderActions'
import { createChangeOfCourseOrder } from './changeOfCourseActions'
import { createOlevelUploadOrder } from './oLevelResultUploadActions'
import { createJambPasswordResetOrder } from './jambPasswordResetActions'
import { setMessage } from './utilActions'

const normalConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const getWalletAmount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_AMOUNT_REQUEST,
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

    const { data } = await axios.get(`/api/users/wallet/amount`, config)

    dispatch({
      type: WALLET_AMOUNT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: WALLET_AMOUNT_FAIL,
      payload: message,
    })
  }
}

export const emailAllUsers = (emailMessage) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_EMAIL_REQUEST,
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

    const { data } = await axios.post(`/api/users/email`, emailMessage, config)

    dispatch({
      type: USERS_EMAIL_SUCCESS,
      payload: data,
    })

    dispatch(setMessage(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USERS_EMAIL_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const emailAUser = (id, emailMessage) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EMAIL_REQUEST,
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
      `/api/users/${id}/email`,
      emailMessage,
      config,
    )

    dispatch({
      type: USER_EMAIL_SUCCESS,
      payload: data,
    })

    dispatch(setMessage(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USER_EMAIL_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const emailAUserByEmail = (email, emailMessage) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: USER_EMAIL_BY_EMAIL_REQUEST,
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
      `/api/users/email/${email}`,
      emailMessage,
      config,
    )

    dispatch({
      type: USER_EMAIL_BY_EMAIL_SUCCESS,
      payload: data,
    })

    dispatch(setMessage(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USER_EMAIL_BY_EMAIL_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

export const makeUserAdmin = (id, adminStatus) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: USER_MAKEADMIN_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/users/makeadmin/${id}`,
      { adminStatus },
      config,
    )

    dispatch({
      type: USER_MAKEADMIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_MAKEADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch(
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    )
  }
}

export const makeUserEditor = (id, editorStatus) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: USER_MAKEEDITOR_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/users/makeeditor/${id}`,
      { editorStatus },
      config,
    )

    dispatch({
      type: USER_MAKEEDITOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_MAKEEDITOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch(
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    )
  }
}

export const deleteAUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch(
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    )
  }
}

export const getAUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
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

    const { data } = await axios.get('/api/users', config)

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      normalConfig,
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch(getWalletAmount())
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      normalConfig,
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
      '/api/users/profile/update',
      { user },
      config,
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch(getWalletAmount())
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const activateAccount = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CONFIRM_EMAIL_REQUEST,
    })

    const { data } = await axios.put(
      '/api/users/emailconfirmation',
      { token },
      normalConfig,
    )

    dispatch({
      type: USER_CONFIRM_EMAIL_SUCCESS,
      payload: data,
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_CONFIRM_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resendConfirmationEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESEND_CODE_REQUEST,
    })

    const { data } = await axios.patch(
      '/api/users/resendemail',
      { email },
      normalConfig,
    )

    dispatch({
      type: USER_RESEND_CODE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_RESEND_CODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    })

    const { data } = await axios.put(
      '/api/users/forgotpassword',
      { email },
      normalConfig,
    )

    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_RESET_REQUEST,
    })

    const { data } = await axios.put(
      '/api/users/resetpassword',
      { token, password },
      normalConfig,
    )

    dispatch({
      type: USER_PASSWORD_RESET_SUCCESS,
      payload: data,
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const facebooklogin = (userID, accessToken) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const { data } = await axios.post(
      '/api/users/facebooklogin',
      { userID, accessToken },
      normalConfig,
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const setProfilePhoto = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_PHOTO_REQUEST,
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
      `/api/users/${id}/profilephoto`,
      formData,
      config,
    )

    dispatch({
      type: USER_PROFILE_PHOTO_SUCCESS,
      payload: data,
    })

    const newUserInfo = {
      ...userInfo,
      profile: { ...userInfo.profile, picture: data },
    }
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
  } catch (error) {
    dispatch({
      type: USER_PROFILE_PHOTO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const setUserImage = (photoUrl) => async (dispatch, getState) => {
  dispatch({
    type: SET_PROFILE_IMAGE,
    payload: photoUrl,
  })
}

export const debitWallet = ({
  transactionType = 'card',
  qty = 0,
  cardId = '',
  orderId = '',
  amount,
  orderItems = {},
} = {}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_DEBIT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const id = userInfo._id
    const transactionId = uuid()
    const paymentMethod = 'wallet'

    const paymentResult = {
      id: transactionId,
      status: 'success',
      update_time: String(new Date().getTime()),
      email: userInfo.email,
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      '/api/users/wallet/debit',
      { id, amount, paymentResult },
      config,
    )

    dispatch({
      type: WALLET_DEBIT_SUCCESS,
      payload: data,
    })

    if (data) {
      if (transactionType === 'card') {
        dispatch(cardPayOrder(qty, cardId, orderId, paymentResult))
      } else if (transactionType === 'changeofcourse') {
        dispatch(
          createChangeOfCourseOrder({
            orderItems,
            price: amount,
            paymentMethod,
            paymentResult,
          }),
        )
      } else if (transactionType === 'olevelresultupload') {
        dispatch(
          createOlevelUploadOrder(
            orderItems,
            amount,
            paymentMethod,
            paymentResult,
          ),
        )
      } else if (transactionType === 'jambpasswordreset') {
        dispatch(
          createJambPasswordResetOrder({
            orderItems,
            price: amount,
            paymentMethod,
            paymentResult,
          }),
        )
      }
    }

    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch(getWalletAmount())
  } catch (error) {
    dispatch({
      type: WALLET_DEBIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const creditWallet = (amount, paymentResult, method) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: WALLET_CREDIT_REQUEST,
    })

    console.log(amount, paymentResult, method)

    const {
      userLogin: { userInfo },
    } = getState()

    const id = userInfo._id

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      '/api/users/wallet/credit',
      { id, amount, paymentResult, method },
      config,
    )

    dispatch({
      type: WALLET_CREDIT_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch(getWalletAmount())
  } catch (error) {
    dispatch({
      type: WALLET_CREDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminCreditWallet = (id, amount) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put('/api/users/wallet/credit/admin', { id, amount }, config)

    dispatch(getAUser(id))
    dispatch(setMessage('Amount successfully added to user'))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(setMessage(message))
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT,
  })
}

export const getAnnouncement = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/announcement/`)
    dispatch({
      type: GET_ANNOUNCEMENT,
      payload: data[0],
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateAnnouncement = (announcement) => async (
  dispatch,
  getState,
) => {
  try {
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
      `/api/announcement`,
      { announcement },
      config,
    )
    dispatch({
      type: SAVE_ANNOUNCEMENT_SUCCESS,
      payload: data,
    })
    dispatch(setMessage('Announcement is successfuly saved'))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SAVE_ANNOUNCEMENT_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}
