import React, { PropTypes, Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import moment from 'moment'
import zones from '../zones'

export default function (props) {
  return (<Popup coordinates={props.position} anchor="bottom">
    <div>
      <h1>{props.title}</h1>
      <table>
        <tbody>
          <tr><td>SAS7918</td><td>Bags: {moment('2016-10-02T00:33:22').fromNow()}</td></tr>
          <tr><td>SAS7918</td><td>Bags: {moment('2016-10-03T01:33:22').fromNow()}</td></tr>
          <tr><td>SAS7918</td><td>Bags: {moment('2016-10-03T02:33:22').fromNow()}</td></tr>
          <tr><td>SAS7918</td><td>Bags: {moment('2016-10-03T03:33:22').fromNow()}</td></tr>
        </tbody>
      </table>
    </div>
  </Popup>)
}
