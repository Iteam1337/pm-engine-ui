import { BOOKINGS_UPDATE } from '../actions/bookings'

import { handleActions } from 'redux-actions'

const initialState = {
  stuff: ''
}

export default handleActions({
  [BOOKINGS_UPDATE]: (state, payload) => ({
    ...state
  })
}, initialState)
