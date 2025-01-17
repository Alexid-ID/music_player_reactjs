import axios from "axios";
import { RiOutletFill } from "react-icons/ri";

const baseUrl = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}api/users/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/users/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (id, role) => {
  try {
    const res = await axios.put(`${baseUrl}api/users/updateRole/${id}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/users/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

// Songs
export const saveNewSong = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}api/songs/save`, { ...data });
    return res.data.song;
  } catch (error) {
    return null;
  }
};

// Artists
export const saveNewArtist = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}api/artists/save`, { ...data });
    return res.data;
  } catch (error) {
    return null;
  }
};

// Album 
export const saveNewAlbum = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}api/albums/save`, { ...data });
    return res.data;
  } catch (error) {
    return null;
  }
};

// delete song
export const deleteSong = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

// delete artist
export const deleteArtist = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/artists/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

// delete album
export const deleteAlbum = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/albums/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};