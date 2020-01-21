import React, { PropTypes, Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import zones from '../zones'

export default function () {
  return (<Layer
    type="fill"
    paint={{ 'fill-outline-color': '#38ffa1', 'fill-opacity': .3, 'fill-color': 'transparent' }}>
    {Object.keys(zones).map(zoneId => 
      <Feature
      coordinates={[zones[zoneId]]}
      key={zoneId}/>
      )}
  </Layer>)
}
