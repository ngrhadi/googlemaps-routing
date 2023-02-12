const { decodePolyline } = require("../utils/decoded-polyline")

async function routeApiController(req, res, next) {
  const {
    origin,
    destination,
    mode,
    polylineEncoding,
    key
  } = req.body

  try {
    let fetching = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&polylineEncoding=${polylineEncoding}&key=${key}`).then(response => response.json()).catch(err => console.log(err))

    var polyline = decodePolyline(JSON.stringify(fetching.routes.map(e => e.overview_polyline.points)[0]))

    console.log()
    res.send({
      response: fetching,
      polyline: polyline.slice(1),
      timestamp: new Date().getTime(),
    })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  routeApiController
}
