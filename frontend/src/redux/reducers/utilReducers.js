import {
    DRAWER_OPEN,
    DRAWER_CLOSE,
    MESSAGE_SET,
    MESSAGE_RESET
} from "../constants/utilConstants"

export const drawerToggleReducer = (state = { drawerState: false }, action) => {
    switch (action.type) {
        case DRAWER_OPEN:
            return { drawerState: true }

        case DRAWER_CLOSE:
            return { drawerState: false }

        default:
            return state
    }
}

export const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_SET:
            return {
                message: action.payload
            }

        case MESSAGE_RESET:
            return {}

        default:
            return state
    }
}