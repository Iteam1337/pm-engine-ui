import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Cars.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class Cars extends Component {

  render () {
    return (
        <Map center={this.props.position} zoom={13} styleName='cars'>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.cars.map(car => (
            <Marker position={[car.position.lat, car.position.lon]} key={car.id}>
              <Popup>
                <span>Bil nr {car.id}. <br/>
                  Hastighet: {car.position.speed}km/h
                  Status: {car.busy ? 'upptagen' : 'ledig'} {car.heading && ` och är påväg till ${car.heading.address}. ${car.position.lat} ${car.position.lon}`}<br/>

                  current:{JSON.stringify(car.position.instruction)}<br/>
                  next:{JSON.stringify(car.position.next.instruction)}<br/>
                </span>
              </Popup>
            </Marker>
          ))}
        </Map>
    )
  }
}

Cars.defaultProps = {
  position: [59.505, 18.09]
}

Cars.propTypes = {
  position: PropTypes.array.isRequired,
  cars: PropTypes.array
}

export default CSSModules(Cars, styles)
