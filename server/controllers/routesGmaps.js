const { pool, db } = require("../queries/index");
const queries = require("../queries/gmaps");


async function storeDataController(req, res, next) {
  const {
    x1,
    y1,
    x2,
    y2,
    distance,
    duration,
    route,
    code,
  } = req.body;

  pool.query(
    'INSERT INTO public."googlemaps" (origin, destination, distance, duration, route,code) values (point($1,$2),point($3,$4),$5,$6,$7,$8) returning code',
    [
      x1,
      y1,
      x2,
      y2,
      distance,
      duration,
      route,
      code
    ],
    (error, results) => {
      if (error) throw error;
      res.send("Origin has been created");
    },
  );
};

module.exports = {
  storeDataController
}
