const _ = require('highland')
const moment = require('moment')
const engine = require('engine') // TODO: peka om lokalt

const cache = {}

function register (app, io) {
  io.on('connection', function (socket) {
    console.log('connection to socket', socket.id)
    _.merge([_.values(cache), engine.cars.fork()])
    .filter(car => car)
    .doto(car => cache[car.id] = car)
    .pick(['position', 'status', 'id', 'tail', 'zone', 'speed', 'bearing'])
    .doto(car => car.lastSeen = car.position.date)
    .filter(car => moment(car.lastSeen).isAfter(moment().subtract(2, 'minutes')))
    .doto(car => car.position = [car.position.lon, car.position.lat, car.position.date])
    .map(car => Object.assign({}, car, {tail: car.tail ? car.tail.filter(t => t[2] > Date.now() - 120000) : []}))
    //.filter(car => car.position.speed > 90) // endast bilar över en viss hastighet
    //.ratelimit(100, 100)
    .batchWithTimeOrCount(1000, 2000)
    .errors(console.error)
    .each(cars => socket.volatile.emit('cars', cars))
/*
    engine.assignments
    .fork()
    .each(car => socket.volatile.emit('assignment', car))

    engine.bookings
    .fork()
    .each(car => socket.volatile.emit('booking', car))
*/
  })

  
}

module.exports = {
  register
}
