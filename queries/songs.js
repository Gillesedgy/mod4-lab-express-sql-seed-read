// IMPORT DB
const db = require("../db/dbConfig.js");

//
const getAllSongs = async (album_id) => {
  try {
    const allSongs = await db.any(
      "SELECT * FROM songs WHERE album_id=$1",
      album_id
    );
    return allSongs;
  } catch (error) {
    return error;
  }
};
//! SHOW and CREATE
const getSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};
// CREATE / POST
const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite, album_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        song.name,
        song.artist,
        song.album,
        song.time,
        song.is_favorite,
        
      ]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

//DELETE
const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id=$1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};
// UPDATE

const updateSong = async (id, song) => {
  try {
    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite, id]
    );
    return updatedSong;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getSong,
  getAllSongs,
  createSong,
  deleteSong,
  updateSong,
  updateSong,
};
