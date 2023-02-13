const getOrigin =
  'SELECT * from public."origins"';

const getOriginGeoJSON =
  'SELECT json_build_object(type, FeatureCollection,features, json_agg(ST_AsGeoJSON(t.*)::json)) FROM public."origins" as t(id, name, geom)';

// get id where geom is not on GeoJSON Format
const getOriginById =
  'SELECT *,  ST_AsGeojson((geom),4326)::json as geometry from public."origins" where id = $1';

const addOrigin =
  'INSERT INTO public."origins" (location) values (point($1,$2)) returning location';
// (ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326)

const updateOrigin =
  'UPDATE public."origins" SET geom = $1::geometry, status = $2, db_oper = $3, light_ares = $4, device_id = $5, struc_type = $6, pole_no = $7, remarks = $8, lv_ptc = $9 WHERE id = $10';

const removeOrigin = 'DELETE from public."origins" WHERE id = $1';

module.exports = {
  getOrigin,
  getOriginById,
  getOriginGeoJSON,
  addOrigin,
  updateOrigin,
  removeOrigin,
};
