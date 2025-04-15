import db from '../config/db.js';

const checker = async (req, res) => {
  try{
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    res.status(200).json({ status : "ok", masssage : "Database connection healthy"})
  }catch(err){
    res.status(500).json({ status : "fail", masssage : "Database connection failed", error : err})
  }
};

export default checker;