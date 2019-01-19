import stream from '../apis/streams'
import history from '../history'
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from './types'

export const onSignIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const onSignOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const {userId} = getState().auth
        const response = await stream.post('/streams', {...formValues, userId})
        console.log(response)
        dispatch({type: CREATE_STREAM, payload: response.data})

        if (response && response.status === 201) {
            history.push('/')
        }
    }
}

export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await stream.get('/streams')
        return dispatch({type: FETCH_STREAMS, payload: response.data})
    }
}

export const fetchStream = (id) => {
    return async (dispatch) => {
        const response = await stream.get(`/streams/${id}`)
        dispatch({type: FETCH_STREAM, payload: response.data})
    }
}

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await stream.patch(`/streams/${id}`, formValues)
        dispatch({type: EDIT_STREAM, payload: response.data})

        if (response && response.status === 200) {
            history.push('/')
        }
    }
}

export const deleteStream = (id) => {
    return async (dispatch) => {
        const response = await stream.delete(`/streams/${id}`)
        dispatch({type: DELETE_STREAM, payload: id})

        if (response && response.status === 200) {
            history.push('/')
        }
    }
}
