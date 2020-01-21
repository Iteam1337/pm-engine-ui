import { createAction } from 'redux-actions'
import _ from 'highland'
import { socket } from '../core/HttpClient'

export const CARS_UPDATE = 'CARS_UPDATE'

/* ACTIONS
------------------------------------------------- */
const carsUpdate = createAction(CARS_UPDATE)

/* THUNKS
------------------------------------------------- */
export const fetchCars = () => {
  return (dispatch) => {
    _('cars', socket()).each(cars => dispatch(carsUpdate(cars)))
  }
}
