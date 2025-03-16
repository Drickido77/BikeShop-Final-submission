const pool = require("../config/db");

const getBikes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bikes");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getBikes };
