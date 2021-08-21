import axios from 'axios'
import {
  SCHOOL_LIST_REQUEST,
  SCHOOL_LIST_SUCCESS,
  SCHOOL_LIST_FAIL,

  SCHOOL_DETAILS_REQUEST,
  SCHOOL_DETAILS_SUCCESS,
  SCHOOL_DETAILS_FAIL,

  SCHOOL_CREATE_REQUEST,
  SCHOOL_CREATE_SUCCESS,
  SCHOOL_CREATE_FAIL,

  SCHOOL_UPDATE_REQUEST,
  SCHOOL_UPDATE_SUCCESS,
  SCHOOL_UPDATE_FAIL,

  SCHOOL_BY_PROGRAMME_REQUEST,
  SCHOOL_BY_PROGRAMME_SUCCESS,
  SCHOOL_BY_PROGRAMME_FAIL,

  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,

} from '../constants/schoolConstants'
import { logout } from './userActions'
import { setMessage } from './utilActions'

export const listSchools = () => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_LIST_REQUEST })

    const { data } = await axios.get(`/api/schools`)

    dispatch({
      type: SCHOOL_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SCHOOL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSchoolDetailsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/schools/${id}`)

    dispatch({
      type: SCHOOL_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SCHOOL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const listSchoolDetailsByProgramme = (programme) => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_BY_PROGRAMME_REQUEST })

    const { data } = await axios.get(`/api/schools/programme/${programme}`)

    dispatch({
      type: SCHOOL_BY_PROGRAMME_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SCHOOL_BY_PROGRAMME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const createSchool = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHOOL_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/schools/`, {}, config)

    dispatch({
      type: SCHOOL_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SCHOOL_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateSchool = (school) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHOOL_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/schools/${school._id}`, school, config)

    dispatch({
      type: SCHOOL_UPDATE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SCHOOL_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const deleteCourse = (id, courses) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_DELETE_REQUEST,
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }


    const { data } = await axios.put(`/api/schools/${id}/course`, { courses }, config)

    dispatch({
      type: COURSE_DELETE_SUCCESS,
      payload: data,
    })
    dispatch(setMessage("Course removed"))

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload: message,
    })
    dispatch(setMessage(message))
  }
}

