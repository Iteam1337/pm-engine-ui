import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Bookings.css'
import moment from 'moment'

class Bookings extends Component {
  render () {
    return (
      <div>
        HI!
      </div>
    )
  }
}

export default CSSModules(Bookings, styles, { allowMultiple: true })
