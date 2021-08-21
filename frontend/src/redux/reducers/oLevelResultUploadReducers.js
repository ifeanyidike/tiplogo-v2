import {
    OLEVEL_UPLOAD_CREATE_FAIL,
    OLEVEL_UPLOAD_CREATE_REQUEST,
    OLEVEL_UPLOAD_CREATE_SUCCESS,
    OLEVEL_UPLOAD_CREATE_RESET,
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
} from "../constants/oLevelResultUploadConstants"


export const oLevelUploadBlobReducer = (state = {}, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_BLOB_REQUEST:
            return {
                loading: true
            }
        case OLEVEL_UPLOAD_BLOB_SUCCESS:
            return {
                loading: false,
                success: true,
                file: action.payload
            }
        case OLEVEL_UPLOAD_BLOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const oLevelUploadAdminUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_ITEM_DELIVER_REQUEST:
            return {
                loading: true
            }
        case OLEVEL_UPLOAD_ITEM_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
                file: action.payload
            }
        case OLEVEL_UPLOAD_ITEM_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const oLevelUploadOrderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_DELETE_REQUEST:
            return {
                loading: true
            }
        case OLEVEL_UPLOAD_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case OLEVEL_UPLOAD_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const oLevelUploadOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_CREATE_REQUEST:
            return {
                loading: true
            }
        case OLEVEL_UPLOAD_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case OLEVEL_UPLOAD_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case OLEVEL_UPLOAD_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const oLevelUploadOrderDetailsReducer = (
    state = { orderItems: [] }, action
) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case OLEVEL_UPLOAD_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case OLEVEL_UPLOAD_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const oLevelUploadOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_UPDATE_REQUEST:
            return {
                loading: true
            }

        case OLEVEL_UPLOAD_UPDATE_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }

        case OLEVEL_UPLOAD_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const oLevelUploadOrderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case OLEVEL_UPLOAD_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case OLEVEL_UPLOAD_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const oLevelUploadOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case OLEVEL_UPLOAD_LIST_REQUEST:
            return {
                loading: true
            }
        case OLEVEL_UPLOAD_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case OLEVEL_UPLOAD_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}