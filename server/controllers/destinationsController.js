const queries = require("../queries/destination");
const { pool } = require("../queries/index");

const getDestinationController = async (req, res) => {
  const results = await pool.query(queries.getDestination);
  res.status(200).send(results.rows);
};

const getDestinationByIdController = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(queries.getDestinationById, [id]);
  // eslint-disable-next-line eqeqeq
  if (result.length == 0) {
    res.redirect("/");
    res.status(404).send("Pole not found");
  }
  res.status(200).send(result.rows);
  return result;
};

const addDestinationController = (req, res) => {
  const {
    geom,
    status,
    db_oper,
    light_ares,
    device_id,
    struc_type,
    pole_no,
    remarks,
    lv_ptc,
  } = req.body;
  pool.query(
    queries.addDestination,
    [
      geom,
      status,
      db_oper,
      light_ares,
      device_id,
      struc_type,
      pole_no,
      remarks,
      lv_ptc,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Pole has been created");
    },
  );
};

const updateDestinationController = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // const queryGeom = `UPDATE poles SET geom = ST_SetSRID(ST_GeomFromGeoJSON('${req.body.geom}'), 4326) WHERE id = ${req.params.id}`;
    const queryText = queries.updateDestination;
    const res = await client.query(queryText, [
      req.body.geom,
      req.body.status,
      req.body.db_oper,
      req.body.light_ares,
      req.body.device_id,
      req.body.struc_type,
      req.body.pole_no,
      req.body.remarks,
      req.body.lv_ptc,
      req.params.id,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    // console.log(req.body);
  }
  res.status(200).send("Pole has been updated");
};

// const updateOriginCoord = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");
//     const fromquery = queries.getOriginById;
//     const toquery = queries.updateOrigin;
//     await client.query(fromquery, [req.params.id]);
//     await client.query(toquery, [
//       req.body.geom,
//       req.params.id,
//       req.body.status,
//       req.body.db_oper,
//       req.body.light_ares,
//       req.body.device_id,
//       req.body.struc_type,
//       req.body.pole_no,
//       req.body.remarks,
//       req.body.lv_ptc,
//     ]);
//     await client.query("COMMIT");
//   } catch (error) {
//     await client.query("ROLLBACK");
//     throw error;
//   } finally {
//     client.release();
//   }
//   res.status(200).send("Pole has been updated");
// };

const deleteDestinationController = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.removeDestination, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Pole has been deleted");
  });
};



module.exports = {
  getDestinationController,
  getDestinationByIdController,
  addDestinationController,
  updateDestinationController,
  deleteDestinationController,
  // updateOriginCoord,
};
