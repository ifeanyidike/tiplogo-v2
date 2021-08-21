import {
    SUBJECT_LIST_REQUEST,
    SUBJECT_LIST_SUCCESS,
    SUBJECT_LIST_FAIL,

    SUBJECT_CREATE_REQUEST,
    SUBJECT_CREATE_SUCCESS,
    SUBJECT_CREATE_FAIL,
} from '../constants/subjectConstants'

export const subjectListReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBJECT_LIST_REQUEST:
            return { loading: true }
        case SUBJECT_LIST_SUCCESS:
            return {
                loading: false,
                subjects: action.payload,
                success: true,
            }
        case SUBJECT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const subjectCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBJECT_CREATE_REQUEST:
            return {
                loading: true
            }
        case SUBJECT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                subject: action.payload
            }
        case SUBJECT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

