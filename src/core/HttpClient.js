import request from 'superagent'
import _ from 'highland'
import io from 'socket.io-client'
var _socket

export function get (url) {
  return fetch(url)
    .then(response => response.json())
}

export function sse (url, type) {
  var source = new EventSource(url)
  source.on = source.addEventListener
  return _(type, source).pluck('data').map(JSON.parse)
}

export function socket () {
  if (_socket) return _socket
  _socket = io.connect({transports: ['websocket']})
  return _socket
}

export function post (url, payload) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send(payload)
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null)
          } else {
            reject(err)
          }
        } else {
          resolve(res.body)
        }
      })
  })
}

export default {
  get: get,
  post: post,
  sse: sse
}
