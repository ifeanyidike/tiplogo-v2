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
    JAMB_PASSWORD_RESET_CREATE_RESET,
    JAMB_PASSWORD_RESET_DELETE_REQUEST,
    JAMB_PASSWORD_RESET_DELETE_SUCCESS,
    JAMB_PASSWORD_RESET_DELETE_FAIL,
} from "../constants/jambPasswordResetConstants"


export const jambPasswordResetOrderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case JAMB_PASSWORD_RESET_DELETE_REQUEST:
            return {
                loading: true
            }
        case JAMB_PASSWORD_RESET_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case JAMB_PASSWORD_RESET_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const jambPasswordResetOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case JAMB_PASSWORD_RESET_CREATE_REQUEST:
            return {
                loading: true
            }
        case JAMB_PASSWORD_RESET_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case JAMB_PASSWORD_RESET_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JAMB_PASSWORD_RESET_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const jambPasswordResetOrderDetailsReducer = (
    state = { orderItems: [] }, action
) => {
    switch (action.type) {
        case JAMB_PASSWORD_RESET_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case JAMB_PASSWORD_RESET_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case JAMB_PASSWORD_RESET_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const jambPasswordResetOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case JAMB_PASSWORD_RESET_UPDATE_REQUEST:
            return {
                loading: true
            }

        case JAMB_PASSWORD_RESET_UPDATE_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }

        case JAMB_PASSWORD_RESET_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const jambPasswordResetOrderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case JAMB_PASSWORD_RESET_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case JAMB_PASSWORD_RESET_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case JAMB_PASSWORD_RESET_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const jambPasswordResetOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case JAMB_PASSWORD_RESET_LIST_REQUEST:
            return {
                loading: true
            }
        case JAMB_PASSWORD_RESET_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case JAMB_PASSWORD_RESET_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


