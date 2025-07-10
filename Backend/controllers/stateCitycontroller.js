const { sql, poolPromise } = require('../config/db.js');

// Get states based on search query
const getStates = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const pool = await poolPromise;
    
    // Query the tbl_masterState table - using 'stateName' column
    const result = await pool.request()
      .input('query', sql.NVarChar, `${q.trim()}%`)
      .query('SELECT stateName as name FROM tbl_masterState WHERE stateName LIKE @query AND status = 1 ORDER BY stateName');
    
    // Return actual database results
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

// Get cities based on search query
const getCities = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const pool = await poolPromise;
    
    // Query the tbl_masterCity table - using 'City_Name' column
    const result = await pool.request()
      .input('query', sql.NVarChar, `${q.trim()}%`)
      .query('SELECT City_Name as name FROM tbl_masterCity WHERE City_Name LIKE @query AND status = 1 ORDER BY City_Name');
    
    // Return actual database results
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

module.exports = {
  getStates,
  getCities
};