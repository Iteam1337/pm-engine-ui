import React, { Component } from 'react'
import Bookings from './Bookings'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as BookingsActions from '../../actions/bookings'

export class BookingsContainer extends Component {
  componentDidMount () {
    this.props.update()
  }

  render () {
    return (
      <Bookings {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatch (dispatch) {
  return bindActionCreators(BookingsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(BookingsContainer)
