import { combineReducers } from 'redux'
import bookings from './bookings'
import cars from './cars'

const rootReducer = combineReducers({
  bookings,
  cars
})

export default rootReducer
