import db from "../config/db.js";

export const createUser = async (username, email, hashedPassword) => {
  const [result] = await db.execute(
    "INSERT INTO users (username,email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
  return {
    id: result.insertId,
    username,
    email,
  };
};

export const getUserByUsername = async (username) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

export const getUserProfile = async (id) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
    id,
  ]);
  return rows[0];
};
