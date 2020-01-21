import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import BookingsContainer from '../Bookings/BookingsContainer'
import CarMapContainer from '../Map/CarMapContainer'
import Bookings from '../Bookings'

export const App = () =>
  <div>
    <img src='https://konto.taxistockholm.se/static/images/logo_white@3x.png' styleName='logo'/>
    <CarMapContainer />
  </div>

App.propTypes = {
  FlightActions: PropTypes.object,
  flights: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object)
}

export default CSSModules(App, styles)
