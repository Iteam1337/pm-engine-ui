import React, { Component } from 'react'
import App from './App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FlightsActions from '../../actions/flights'

export class AppContainer extends Component {
  componentDidMount () {
    this.props.fetchFlights()
  }

  render () {
    return (
      <App {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    flights: state.flights.flights
  }
}

function mapDispatch (dispatch) {
  return bindActionCreators(FlightsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(AppContainer)
