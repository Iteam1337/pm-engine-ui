import { createAction } from 'redux-actions'
import { get } from '../core/HttpClient'

export const FLIGHTS_UPDATE = 'FLIGHTS_UPDATE'

/* ACTIONS
------------------------------------------------- */
const flightsUpdate = createAction(FLIGHTS_UPDATE)

/* THUNKS
------------------------------------------------- */
export const fetchFlights = () => {
  return (dispatch) => {
    Promise.all([get('/flights/ARN'), get('/flights/BMA')])
      .then(([arlanda, bromma]) => {
        dispatch(flightsUpdate([...arlanda.Flights, ...bromma.Flights]))
      })
  }
}
