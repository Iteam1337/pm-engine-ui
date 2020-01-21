import { CARS_UPDATE } from '../actions/cars'

import { handleActions } from 'redux-actions'

const initialState = {
  cars: []
}

export default handleActions({
  [CARS_UPDATE]: (state, { payload }) => ({
    ...state,
    cars: state.cars.concat(payload).reduce((a,b) => Object.assign(a, {[b.id]: b}),[]) 
  })
}, initialState)
