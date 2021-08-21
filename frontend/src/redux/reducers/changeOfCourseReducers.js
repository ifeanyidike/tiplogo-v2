import {
    COCI_CREATE_FAIL,
    COCI_CREATE_REQUEST,
    COCI_CREATE_SUCCESS,
    COCI_CREATE_RESET,
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
} from "../constants/changeOfCourseConstants"


export const changeOfCourseBlobReducer = (state = {}, action) => {
    switch (action.type) {
        case COCI_BLOB_REQUEST:
            return {
                loading: true
            }
        case COCI_BLOB_SUCCESS:
            return {
                loading: false,
                success: true,
                file: action.payload
            }
        case COCI_BLOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const changeOfCourseAdminUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case COCI_ITEM_DELIVER_REQUEST:
            return {
                loading: true
            }
        case COCI_ITEM_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
                file: action.payload
            }
        case COCI_ITEM_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const changeOfCourseOrderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case COCI_DELETE_REQUEST:
            return {
                loading: true
            }
        case COCI_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case COCI_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const changeOfCourseOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case COCI_CREATE_REQUEST:
            return {
                loading: true
            }
        case COCI_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case COCI_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case COCI_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const changeOfCourseOrderDetailsReducer = (
    state = { lorderItems: [] }, action
) => {
    switch (action.type) {
        case COCI_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case COCI_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case COCI_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const changeOfCourseOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case COCI_UPDATE_REQUEST:
            return {
                loading: true
            }

        case COCI_UPDATE_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }

        case COCI_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const changeOfCourseOrderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case COCI_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case COCI_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }

        case COCI_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const changeOfCourseOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case COCI_LIST_REQUEST:
            return {
                loading: true
            }
        case COCI_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case COCI_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}