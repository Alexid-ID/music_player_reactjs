import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebases.config";

import FilterButtons from "./FilterButtons";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportFunctions";
import { IoMusicalNote } from "react-icons/io5";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [
    {
      allArtists,
      allAlbums,
      artistFilter,
      albumFilter,
      languageFilter,
      filterTerm,
      allSongs,
    },
    dispatch,
  ] = useStateValue();

  //   upload image
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUpLoadProgress, setImageUpLoadProgress] = useState(0);

  //   upload audio
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUpLoadProgress, setAudioUpLoadProgress] = useState(0);

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data,
        });
      });
    }
  }, []);

  const deleteFileObject = (url, isImage) => {
    if (isImage === "image") {
      setIsImageLoading(true);
    }

    if (isImage === "audio") {
      setIsAudioLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef)
      .then(() => {
        if (isImage === "image") {
          setSongImageCover(null);
          setIsImageLoading(false);
        }

        if (isImage === "audio") {
          setAudioImageCover(null);
          setIsAudioLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveSong = () => {
    if (!songImageCover || !audioImageCover) {
      // throw alert
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageUrl: songImageCover,
        songUrl: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      saveNewSong(data).then((data) => {
        console.log("data", data);
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.data,
          });
        });
      });

      setSongName("");
      setSongImageCover(null);
      setAudioImageCover(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      dispatch({
        type: actionType.SET_FILTER_TERM,
        filterTerm: "all",
      });

      dispatch({
        type: actionType.SET_FILTER_ARTIST,
        artistFilter: null,
      });

      dispatch({
        type: actionType.SET_FILTER_ALBUM,
        albumFilter: null,
      });

      dispatch({
        type: actionType.SET_FILTER_LANGUAGE,
        languageFilter: null,
      });
    }
  };

  console.log("audioImageCover", audioImageCover);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-gray-300 p-4">
      <input
        type="text"
        placeholder="Type you song name..."
        className="w-full rounded-md border border-gray-300 bg-transparent p-3 text-base font-semibold text-textColor shadow-sm outline-none"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />

      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <FilterButtons filterData={allArtists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Album"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>

      {/* Image File */}
      <div className="h-300 w-full cursor-pointer rounded-md border-2 border-dotted border-gray-300 bg-card backdrop-blur-md">
        {isImageLoading && <ImageLoader progress={imageUpLoadProgress} />}

        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUpLoader
                updateState={setSongImageCover}
                setProgress={setImageUpLoadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <img
                  src={songImageCover}
                  alt="uploaded image"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 p-3 text-xl outline-none transition-all duration-500 ease-in-out hover:shadow-md"
                  onClick={() => {
                    deleteFileObject(songImageCover, "image");
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio File */}
      <div className="h-300 w-full cursor-pointer rounded-md border-2 border-dotted border-gray-300 bg-card backdrop-blur-md">
        {isAudioLoading && <ImageLoader progress={audioUpLoadProgress} />}

        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUpLoader
                updateState={setAudioImageCover}
                setProgress={setAudioUpLoadProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md">
                <audio controls className="">
                  <source src={audioImageCover} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <button
                  type="button"
                  className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 p-3 text-xl outline-none transition-all duration-500 ease-in-out hover:shadow-md"
                  onClick={() => {
                    deleteFileObject(audioImageCover, "audio");
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex w-60 cursor-pointer items-center justify-center p-4">
        {isImageLoading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-full rounded-md bg-red-600 px-8 py-2 text-white hover:shadow-lg"
            onClick={saveSong}
          >
            Send
          </motion.button>
        )}
      </div>
    </div>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        role="status"
        className="mr-3 inline h-4 w-4 animate-spin text-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

export const ImageLoader = ({ progress }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="relative flex h-10 w-10 min-w-[10px] animate-ping items-center justify-center rounded-full bg-purple-300">
        <div className="absolute inset-0 rounded-full bg-purple-300 blur-xl"></div>
      </div>
    </div>
  );
};

export const FileUpLoader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const upLoadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "/Images" : "/Audios"}/${Date.now()}-${uploadedFile.name}`,
    );

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    console.log("uploadTask", uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        console.log(uploadedFile);
      },
    );
  };

  return (
    <label>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex cursor-pointer flex-col items-center justify-center">
          <p className="text-2xl font-bold">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            click to upload {isImage ? "image" : "audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-image"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        onChange={upLoadFile}
        className="h-0 w-0"
      />
    </label>
  );
};

export default DashboardNewSong;
