const addData =
  'INSERT INTO public."googlemaps" (origin, destination, distance, duration, route,code) values (point($1,$2),point($3,$4),$5,$6,$7,$8) returning code';

module.exports = {
  addData
}
