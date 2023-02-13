const queries = require("../queries/origin");
const { pool } = require("../queries/index");


const getOriginController = async (req, res) => {
  const results = await pool.query(queries.getOrigin);
  res.status(200).send(results.rows);
};

const getOriginByIdController = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(queries.getOriginById, [id]);
  // eslint-disable-next-line eqeqeq
  if (result.length == 0) {
    res.redirect("/");
    res.status(404).send("Pole not found");
  }
  res.status(200).send(result.rows);
  return result;
};

const addOriginController = (req, res) => {
  const {
    x, y
  } = req.body;
  console.log(x, y)
  // let data = [
  //   parseFloat(x),
  //   parseFloat(y),
  // ]

  pool.query(
    queries.addOrigin,
    [x, y],
    (error, results) => {
      console.log(results)
      if (error) throw error;
      res.status(201).send("Origin has been created");
    },
  );
};

const updateOriginController = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // const queryGeom = `UPDATE poles SET geom = ST_SetSRID(ST_GeomFromGeoJSON('${req.body.geom}'), 4326) WHERE id = ${req.params.id}`;
    const queryText = queries.updateOrigin;
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

const deleteOriginController = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.removeOrigin, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Pole has been deleted");
  });
};



module.exports = {
  getOriginController,
  getOriginByIdController,
  addOriginController,
  updateOriginController,
  deleteOriginController,
  // updateOriginCoord,
};
