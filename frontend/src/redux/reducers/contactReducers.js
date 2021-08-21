import {
    CONTACT_CREATE_RESET,
    CONTACT_CREATE_FAIL,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,

    CONTACT_DETAILS_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,


    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,

    CONTACT_LIST_BY_EMAIL_REQUEST,
    CONTACT_LIST_BY_EMAIL_SUCCESS,
    CONTACT_LIST_BY_EMAIL_FAIL,

    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_DELETE_REQUEST
} from "../constants/contactConstants"

export const contactCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_CREATE_REQUEST:
            return {
                loading: true
            }
        case CONTACT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case CONTACT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CONTACT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const contactDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_DELETE_REQUEST:
            return {
                loading: true
            }
        case CONTACT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case CONTACT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const contactDetailsReducer = (state = {}, action) => {

    switch (action.type) {
        case CONTACT_DETAILS_REQUEST:
            return {
                loading: true
            }

        case CONTACT_DETAILS_SUCCESS:
            return {
                loading: false,
                contact: action.payload
            }

        case CONTACT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}



export const contactListByEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_LIST_BY_EMAIL_REQUEST:
            return {
                loading: true
            }

        case CONTACT_LIST_BY_EMAIL_SUCCESS:
            return {
                loading: false,
                contacts: action.payload
            }

        case CONTACT_LIST_BY_EMAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const contactListReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_LIST_REQUEST:
            return {
                loading: true
            }
        case CONTACT_LIST_SUCCESS:
            return {
                loading: false,
                contacts: action.payload
            }

        case CONTACT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

