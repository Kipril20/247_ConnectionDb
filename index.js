import express from "express";
import pg from "pg";
const app = express();
const port = 3000;
const { Pool } = pg;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Mahasiswa",
  password: "12345",
  port: 5432,
});

app.get("/", (req, res, next) => {
  console.log("TEST DATA :");
  pool
    .query("SELECT * FROM biodata")
    .then((testData) => {
      console.log(testData);
      res.send(testData.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching data");
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});