async function getLocationID(req, res, next) {
  const {
    lnglat,
    key
  } = req.body

  try {
    let value = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lnglat}&radius=1500&key=${key}`).then(v => v.json()).catch(err => console.log(err))

    // console.log(res, "location ID")
    res.send({
      response: value,
      locationID: value.results[0].place_id,
      timestamp: new Date().getTime(),
    })

  } catch (error) {
    throw new Error(error.message)
  }

}

module.exports = {
  getLocationID
}
