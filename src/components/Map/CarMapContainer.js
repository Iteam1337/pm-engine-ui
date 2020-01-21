import React, { Component } from 'react'
import Cars from './Cars'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CarsActions from '../../actions/cars'

export class CarMapContainer extends Component {
  componentDidMount () {
    this.props.fetchCars()
  }

  render () {
    return (
      <Cars {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return state.cars
}

function mapDispatch (dispatch) {
  return bindActionCreators(CarsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(CarMapContainer)
