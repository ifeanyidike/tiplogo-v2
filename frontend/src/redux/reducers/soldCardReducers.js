import {
  SOLD_CARD_CREATE_FAIL,
  SOLD_CARD_CREATE_REQUEST,
  SOLD_CARD_CREATE_SUCCESS,
  CARD_MY_SUCCESS,
  CARD_MY_REQUEST,
  CARD_MY_FAIL
} from "../constants/soldCardConstants"


export const soldCardCreateReducer = (state = { card: {} }, action) => {
  switch (action.type) {
    case SOLD_CARD_CREATE_REQUEST:
      return {
        loading: true
      }
    case SOLD_CARD_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        card: action.payload
      }
    case SOLD_CARD_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const cardMyReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case CARD_MY_REQUEST:
      return {
        loading: true
      }
    case CARD_MY_SUCCESS:
      return {
        cards: action.payload,
      }
    case CARD_MY_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
