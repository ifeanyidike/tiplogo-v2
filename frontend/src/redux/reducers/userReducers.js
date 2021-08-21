import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_CONFIRM_EMAIL_REQUEST,
  USER_CONFIRM_EMAIL_SUCCESS,
  USER_CONFIRM_EMAIL_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
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
  WALLET_DEBIT_RESET,
  WALLET_CREDIT_REQUEST,
  WALLET_CREDIT_SUCCESS,
  WALLET_CREDIT_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USERS_LIST_FAIL,
  USERS_LIST_SUCCESS,
  USERS_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
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

export const userWalletAmountReducer = (state = { wallet: 0 }, action) => {
  switch (action.type) {
    case WALLET_AMOUNT_REQUEST:
      return {
        loading: true,
      }

    case WALLET_AMOUNT_SUCCESS:
      return {
        loading: false,
        wallet: action.payload,
      }

    case WALLET_AMOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userEmailByEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_BY_EMAIL_REQUEST:
      return {
        loading: true,
      }

    case USER_EMAIL_BY_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      }

    case USER_EMAIL_BY_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_REQUEST:
      return {
        loading: true,
      }

    case USER_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      }

    case USER_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const usersEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_EMAIL_REQUEST:
      return {
        loading: true,
      }

    case USERS_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      }

    case USERS_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userMakeAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MAKEADMIN_REQUEST:
      return {
        loading: true,
      }

    case USER_MAKEADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
      }

    case USER_MAKEADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userMakeEditorReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MAKEEDITOR_REQUEST:
      return {
        loading: true,
      }

    case USER_MAKEEDITOR_SUCCESS:
      return {
        loading: false,
        success: true,
      }

    case USER_MAKEEDITOR_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      }

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }

    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const usersListReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true }

    case USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload }

    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }

    case USER_LIST_SUCCESS:
      return { loading: false, user: action.payload }

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }

    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      }

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      }

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const walletDebitReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_DEBIT_REQUEST:
      return { loading: true }

    case WALLET_DEBIT_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      }

    case WALLET_DEBIT_FAIL:
      return { loading: false, error: action.payload }

    case WALLET_DEBIT_RESET:
      return {}

    default:
      return state
  }
}

export const walletCreditReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_CREDIT_REQUEST:
      return { loading: true }

    case WALLET_CREDIT_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      }

    case WALLET_CREDIT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const accountActivateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONFIRM_EMAIL_REQUEST:
      return { loading: true }

    case USER_CONFIRM_EMAIL_SUCCESS:
      return { loading: false, success: true }

    case USER_CONFIRM_EMAIL_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const emailResendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESEND_CODE_REQUEST:
      return { loading: true }

    case USER_RESEND_CODE_SUCCESS:
      return { loading: false, success: true, result: action.payload }

    case USER_RESEND_CODE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const passwordForgotReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      }

    case USER_FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        result: action.payload,
        success: true,
      }

    case USER_FORGOT_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return {
        loading: true,
      }

    case USER_PASSWORD_RESET_SUCCESS:
      return {
        loading: false,
        result: action.payload,
        success: true,
      }

    case USER_PASSWORD_RESET_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const profilePhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_PHOTO_REQUEST:
      return {
        loading: true,
      }

    case USER_PROFILE_PHOTO_SUCCESS:
      return {
        loading: false,
        photoUrl: action.payload,
        success: true,
      }

    case USER_PROFILE_PHOTO_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const photoReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PROFILE_IMAGE:
      return {
        imageUrl: action.payload,
      }

    default:
      return state
  }
}

export const announcementReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENT:
      return {
        announcement: action.payload,
      }

    case SAVE_ANNOUNCEMENT_SUCCESS:
      return {
        announcement: action.payload,
        success: true,
      }

    case SAVE_ANNOUNCEMENT_FAIL:
      return {
        error: action.payload,
      }
    default:
      return state
  }
}
