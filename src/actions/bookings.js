import { createAction } from 'redux-actions'
import _ from 'highland'
import { socket } from '../core/HttpClient'

export const BOOKINGS_UPDATE = 'BOOKINGS_UPDATE'

/* ACTIONS
------------------------------------------------- */
const bookingsUpdate = createAction(BOOKINGS_UPDATE)

/* THUNKS
------------------------------------------------- */
export const fetchbookings = () => {
  return (dispatch) => {
    _('bookings', socket()).each(booking => dispatch(bookingsUpdate(booking)))
  }
}
