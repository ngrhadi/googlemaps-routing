const getDestination =
  'SELECT *, ST_AsGeojson((geom),4326)::json as geometry from public."destinations"';

const getDestinationGeoJSON =
  'SELECT json_build_object(type, FeatureCollection,features, json_agg(ST_AsGeoJSON(t.*)::json)) FROM public."destinations" as t(id, name, geom)';

// get id where geom is not on GeoJSON Format
const getDestinationById =
  'SELECT *,  ST_AsGeojson((geom),4326)::json as geometry from public."destinations" where id = $1';

const addDestination =
  'INSERT INTO public."destinations" (geom, status, db_oper, light_ares, device_id, struc_type, pole_no, remarks, lv_ptc) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_1';
// (ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326)

const updateDestination =
  'UPDATE public."destinations" SET geom = $1::geometry, status = $2, db_oper = $3, light_ares = $4, device_id = $5, struc_type = $6, pole_no = $7, remarks = $8, lv_ptc = $9 WHERE id = $10';

const removeDestination = 'DELETE from public."destinations" WHERE id = $1';

module.exports = {
  getDestination,
  getDestinationById,
  getDestinationGeoJSON,
  addDestination,
  updateDestination,
  removeDestination,
};
