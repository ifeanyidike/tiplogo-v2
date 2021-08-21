import {
  CARD_LIST_REQUEST,
  CARD_LIST_SUCCESS,
  CARD_LIST_FAIL,
  CARD_DETAILS_REQUEST,
  CARD_DETAILS_SUCCESS,
  CARD_DETAILS_FAIL,
  CARD_DELETE_REQUEST,
  CARD_DELETE_SUCCESS,
  CARD_DELETE_FAIL,
  CARD_CREATE_RESET,
  CARD_CREATE_FAIL,
  CARD_CREATE_SUCCESS,
  CARD_CREATE_REQUEST,
  CARD_UPDATE_REQUEST,
  CARD_UPDATE_SUCCESS,
  CARD_UPDATE_FAIL,
  CARD_UPDATE_RESET,
  CARD_LIST_FEW_REQUEST,
  CARD_LIST_FEW_SUCCESS,
  CARD_LIST_FEW_FAIL,
  CARD_ITEM_DELIVER_REQUEST,
  CARD_ITEM_DELIVER_SUCCESS,
  CARD_ITEM_DELIVER_FAIL,
  CARD_ADD_ITEM_REQUEST,
  CARD_ADD_ITEM_SUCCESS,
  CARD_ADD_ITEM_FAIL,
} from '../constants/cardConstants'


export const cardListReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case CARD_LIST_REQUEST:
      return { loading: true, cards: [] }
    case CARD_LIST_SUCCESS:
      return {
        loading: false,
        cards: action.payload.cards,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case CARD_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cardListFewReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_LIST_FEW_REQUEST:
      return { loading: true }
    case CARD_LIST_FEW_SUCCESS:
      return {
        loading: false,
        cards: action.payload.cards
      }
    case CARD_LIST_FEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cardDetailsReducer = (state = { card: { price: 0 } }, action) => {
  switch (action.type) {
    case CARD_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CARD_DETAILS_SUCCESS:
      return { loading: false, card: action.payload }
    case CARD_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cardDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_DELETE_REQUEST:
      return { loading: true }
    case CARD_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CARD_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cardCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_CREATE_REQUEST:
      return { loading: true }
    case CARD_CREATE_SUCCESS:
      return { loading: false, success: true, card: action.payload }
    case CARD_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CARD_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const cardUpdateReducer = (state = { card: {} }, action) => {
  switch (action.type) {
    case CARD_UPDATE_REQUEST:
      return { loading: true }
    case CARD_UPDATE_SUCCESS:
      return { loading: false, success: true, card: action.payload }
    case CARD_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CARD_UPDATE_RESET:
      return { card: {} }
    default:
      return state
  }
}


export const cardAddItemReducer = (state = { card: {} }, action) => {
  switch (action.type) {
    case CARD_ADD_ITEM_REQUEST:
      return {
        loading: true
      }
    case CARD_ADD_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        card: action.payload
      }
    case CARD_ADD_ITEM_FAIL:
      return {
        loading: false, error: action.payload
      }
    default:
      return state
  }
}


export const cardItemsDeliverReducer = (state = { card: {} }, action) => {
  switch (action.type) {
    case CARD_ITEM_DELIVER_REQUEST:
      return { loading: true }
    case CARD_ITEM_DELIVER_SUCCESS:
      return { loading: false, success: true, purchasedItem: action.payload }
    case CARD_ITEM_DELIVER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

