import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import _ from 'highland'
import moment from 'moment'
import styles from './Cars.css'
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl, ScaleControl } from 'react-mapbox-gl';
import Zones from './Layers/Zones'
import Arlanda from './Layers/Arlanda'

const accessToken = 'pk.eyJ1IjoibGFuZGdyZW4iLCJhIjoiY2lmdG9jcmJjMDF5OHQwbTd3N25rcjhhcyJ9.qpVIAJhkz3i8_VGYSbu3Yw'
const containerStyle = {
  height: '100vh',
  width: '100%'
}

const DELAY_MS = 15000

function interpolatePositionFromTail (tail, time) {
  const next = tail.filter(point => point[2] > time)[0]
  const current = tail[tail.indexOf(next)-1]
  if (!current || !next) return next
  const progress = (time - current[2]) / (next[2]-current[2])
  const speed = Math.round(current[3])
  return [current[0] + (next[0] - current[0]) * progress, current[1] + (next[1] - current[1]) * progress, time, speed]
}

class Cars extends Component {

  constructor(props){
    super(props)
    this.state = { cars : props.cars, center: props.center, zoom: 10 }
  }

  componentDidMount () {
    this.interpolate()
  }
  
  interpolate (){
    this.setState({ 
      cars: this.props.cars
        .map(car => Object.assign(car, {position : interpolatePositionFromTail(car.tail, Date.now() - DELAY_MS) || car.position} ))
        .map(car => Object.assign(car, {speed : car.position[3]} ))
    })
    setTimeout(this.interpolate.bind(this), 2000 / (this.state.zoom-7))
  }

  selectCar ( car ) {
    this.setState({car: car})
  }

  mapMoved (map, event) {
    const center = map.getCenter()
    this.setState({center : [center.lng, center.lat] })
  }

  mapZoomed (map) {
    this.setState({zoom : map.getZoom()})
  }

  mapClicked(map, event) {
    console.log('click', map, event)
  }

  render () {
    const selectedCar = this.state.car && this.state.cars[this.state.car.id]
    return (
      <ReactMapboxGl
          accessToken={accessToken}
          center={this.props.center}
          containerStyle={{ height: '100vh', width: '100%' }}
          maxZoom={18}
          minZoom={8}
          onClick={this.mapClicked.bind(this)}
          onMove={this.mapMoved.bind(this)}
          onZoom={this.mapZoomed.bind(this)}
          pitch={50}
          style="mapbox://styles/mapbox/dark-v8"
          >

          <ScaleControl />
          <ZoomControl
            zoomDiff={1} />

          {selectedCar && <Popup coordinates={selectedCar.position} key={selectedCar.id}>
            <div>
              <img src="/static/images/car.png" height="70"/>
              <h1>Bil nr {selectedCar.id}</h1>
              <p>
                📟 {selectedCar.zone}<br/>
                🕡 {selectedCar.speed} km/h<br/>
                ⌚️ {Math.abs(selectedCar.bearing) < 45 ? 'Öst' : Math.abs(selectedCar.bearing) > 135 ? 'Väst' : selectedCar.bearing < 0 ? 'Norr' : 'Syd'} <br/>
                ⏱ {moment(selectedCar.lastSeen).fromNow()} <br/>
                <pre>{JSON.stringify(selectedCar.speed, null, 2)}</pre>
                {selectedCar.status}
              </p>
            </div>
          </Popup>}

          <Arlanda position={[17.931280647817744, 59.65185460706729]} title="Terminal 5" />
          <Arlanda position={[17.928869810735534, 59.64445919147752]} title="Terminal 2" />

          <Layer
            id='free'
            paint={{ 'circle-radius': 5, 'circle-color': '#38ffa1', 'circle-opacity': .8 }}
            // layout={{ 'icon-image': 'rail-metro-15' }}
            type='circle'>
            {
              this.state.cars
                .filter(car => car.status === 'F' )
                .filter(car => moment().subtract(2, 'minutes').isBefore(car.lastSeen))
                .map((car, index) => (
                  <Feature
                    onClick={this.selectCar.bind(this, car)}
                    coordinates={car.position}
                    key={car.id} />
                ))  
            }
          </Layer>
         
          <Layer
            id='busy'
            paint={{ 'circle-radius': 5, 'circle-color': '#ff3b5c', 'circle-opacity': .8 }}
            // layout={{ 'icon-image': 'car-15' }}
            type='circle'>
            {
              this.state.cars
                .filter(car => car.status !== 'F')
                .filter(car => moment().subtract(2, 'minutes').isBefore(car.lastSeen))
                .map((car, index) => (
                  <Feature
                    onClick={this.selectCar.bind(this, car)}
                    coordinates={car.position}
                    key={car.id} />
                ))
            }
          </Layer>

          <Zones />
          
        </ReactMapboxGl>
    )
  }
}

Cars.defaultProps = {
  center: [18.02, 59.305],
  zoom: 10
}

Cars.propTypes = {
  cars: PropTypes.array,
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired
}

export default CSSModules(Cars, styles)
