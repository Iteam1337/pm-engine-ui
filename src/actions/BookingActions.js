import alt from '../alt'
import { post, socket } from '../core/HttpClient'
import _ from 'highland'

class BookingActions {
  constructor () {
    this.generateActions(
      'update',
      'newBooking'
    )
  }

  fetch () {
    return (dispatch) => {

      dispatch()

      const payload = [{
        'orderId': 10105759,
        'orderToken': 'i-test-everything'
      }, {
        'orderId': 10105760,
        'orderToken': 'i-test-everything'
      }, {
        'orderId': 10105761,
        'orderToken': 'i-test-everything'
      }, {
        'orderId': 10105762,
        'orderToken': 'i-test-everything'
      }, {
        'orderId': 10105770,
        'orderToken': 'i-test-everything'
      }, {
        'orderId': 10105771,
        'orderToken': 'i-test-everything'
      }, {
        'orderId': 10105772,
        'orderToken': 'i-test-everything'
      }]

      post('/orders/search', payload)
        .then(data => this.update(data.data))

      _('booking', socket()).each(this.newBooking)

    }
  }
}

export default alt.createActions(BookingActions)
