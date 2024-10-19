import React from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { useState } from "react";
import {
  deleteSong,
  deleteAlbum,
  deleteArtist,
  getAllSongs,
  getAllAlbums,
  getAllArtists,
} from "../api";
import { storage } from "../config/firebases.config";
import { ref, deleteObject } from "firebase/storage";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [
    { alertType, allAritsts, allAlbums, allSongs, isSongPlaying, songIndex },
    dispatch,
  ] = useStateValue();

  const deleteTheObject = () => {
    if (type === "song") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {
        deleteSong(data._id).then((res) => {
          if (res.data) {
            getAllSongs().then((data) => {
              dispatch({
                type: "SET_ALL_SONGS",
                allSongs: data.data,
              });
            });
          } else {
            console.log("error");
          }
        });
      });
    }

    if (type === "album") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {
        deleteAlbum(data._id).then((res) => {
          if (res.data) {
            getAllAlbums().then((data) => {
              dispatch({
                type: "SET_ALL_ALBUMS",
                allAlbums: data.data,
              });
            });
          } else {
            console.log("error");
          }
        });
      });
    }

    if (type === "artist") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {
        deleteArtist(data._id).then((res) => {
          if (res.data) {
            getAllArtists().then((data) => {
              dispatch({
                type: "SET_ALL_ARTISTS",
                allArtists: data.data,
              });
            });
          } else {
            console.log("error");
          }
        });
      });
    }
  };

  const addToContext = () => {
    // console.log(type);
    if(!isSongPlaying) {
        dispatch({
            type: actionType.SET_IS_SONG_PLAYING,
            isSongPlaying: true,
        })
    }

    if(songIndex !== index) {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: index,
        })
    }
  };

  return (
    <motion.div
      className="relative flex w-40 min-w-210 cursor-pointer flex-col items-center rounded-lg bg-gray-100 p-4 px-2 shadow-md hover:bg-card"
      onClick={() => {
        if (type === "song") addToContext();
      }}
    >
      <div className="relative h-40 min-h-[160px] w-40 min-w-[160px] overflow-hidden rounded-lg drop-shadow-lg">
        <motion.div>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={data.imageUrl}
            className="round-lg h-full min-h-[160px] w-full object-cover"
          />
        </motion.div>
      </div>
      <p className="text-headingcolor my-2 text-center text-base font-semibold">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}

        {data.artist && (
          <span className="my-1 block text-sm text-gray-400">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}..`
              : data.artist}
          </span>
        )}
      </p>

      <div className="items=center absolute bottom-2 right-2 flex w-full justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center bg-cardOverlay px-4 py-2 backdrop-blur-sm"
        >
          <p className="text-center text-lg font-semibold text-headingColor">
            Are you sure do you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.7 }}
              className="cursor-pointer rounded-md bg-red-300 px-3 py-1 text-sm uppercase hover:bg-red-500"
              onClick={deleteTheObject}
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.7 }}
              className="hover:bg-gree-500 cursor-pointer rounded-md bg-green-300 px-3 py-1 text-sm uppercase"
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
