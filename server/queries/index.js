const { Pool, Client } = require("pg");
// pools will use environment variables
// for connection information

const pgp = require('pg-promise')();

const pool = new Pool({
  user: "macbookspro",
  host: "localhost",
  database: "home",
  password: "",
  port: 5432,
});

const client = new Client({
  user: "macbookspro",
  host: "localhost",
  database: "home",
  password: "",
  port: 5432,
});
client.connect();

const cn = {
  user: "macbookspro",
  host: "localhost",
  database: "home",
  password: "",
  port: 5432,
  max: 30 // use up to 30 connections

  // "types" - in case you want to set custom type parsers on the pool level
};

const db = pgp(cn);

module.exports = { pool, client, db };
