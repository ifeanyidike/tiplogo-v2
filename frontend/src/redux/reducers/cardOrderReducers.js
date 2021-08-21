import {
    CARD_ORDER_CREATE_RESET,
    CARD_ORDER_CREATE_FAIL,
    CARD_ORDER_CREATE_REQUEST,
    CARD_ORDER_CREATE_SUCCESS,
    CARD_ORDER_DETAILS_FAIL,
    CARD_ORDER_DETAILS_REQUEST,
    CARD_ORDER_DETAILS_SUCCESS,
    CARD_ORDER_LIST_MY_REQUEST,
    CARD_ORDER_LIST_MY_SUCCESS,
    CARD_ORDER_LIST_MY_FAIL,
    CARD_ORDER_LIST_MY_RESET,
    CARD_ORDER_PAY_FAIL,
    CARD_ORDER_PAY_REQUEST,
    CARD_ORDER_LIST_REQUEST,
    CARD_ORDER_LIST_SUCCESS,
    CARD_ORDER_PAY_SUCCESS,
    CARD_ORDER_LIST_FAIL,
    CARD_ORDER_PAY_RESET,
    CARD_ORDER_UPDATE_REQUEST,
    CARD_ORDER_UPDATE_SUCCESS,
    CARD_ORDER_UPDATE_FAIL,
    CARD_ORDER_DELIVER_REQUEST,
    CARD_ORDER_DELIVER_SUCCESS,
    CARD_ORDER_DELIVER_FAIL,
    CARD_NOTPAID_ORDER_LIST_MY_REQUEST,
    CARD_NOTPAID_ORDER_LIST_MY_SUCCESS,
    CARD_NOTPAID_ORDER_LIST_MY_FAIL,
    CARD_ORDER_DELETE_FAIL,
    CARD_ORDER_DELETE_SUCCESS,
    CARD_ORDER_DELETE_REQUEST,
    CARD_ORDER_UPDATE_RESET
} from "../constants/cardOrderConstants"

export const cardOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case CARD_ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case CARD_ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CARD_ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const cardOrderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_ORDER_DELETE_REQUEST:
            return {
                loading: true
            }
        case CARD_ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case CARD_ORDER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const cardOrderDetailsReducer = (
    state = { orderItems: [] }, action
) => {
    switch (action.type) {
        case CARD_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CARD_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case CARD_ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const cardOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_ORDER_UPDATE_REQUEST:
            return {
                loading: true
            }

        case CARD_ORDER_UPDATE_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }

        case CARD_ORDER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CARD_ORDER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const cardOrderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case CARD_ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case CARD_ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CARD_ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

export const cardOrderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }

        case CARD_ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case CARD_ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const cardOrderListMyReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case CARD_ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case CARD_ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CARD_ORDER_LIST_MY_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}

export const cardOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case CARD_ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case CARD_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case CARD_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const cardMyOrderNotPaidListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case CARD_NOTPAID_ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case CARD_NOTPAID_ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case CARD_NOTPAID_ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}