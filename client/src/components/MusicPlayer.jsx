import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { RiPlayListFill } from "react-icons/ri";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { IoMusicalNote } from "react-icons/io5";

const MusicPlayer = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPlayList, setIsPlayList] = useState(false);

  const nextTrack = () => {
    if (songIndex < allSongs.length - 1) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    }
  };

  const previousTrack = () => {
    if (songIndex > 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: allSongs.length - 1,
      });
    }
  };

  return (
    <div className="flex w-full items-center gap-3">
      <div className={`relative flex w-full items-center gap-3 p-4`}>
        <img
          src={allSongs[songIndex]?.imageUrl}
          alt=""
          className="h-20 w-40 rounded-md object-cover"
        />

        <div className="flex flex-col items-start">
          <p className="text-lg font-semibold text-headingColor">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{" "}
            <span className="text-base">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}{" "}
            <span className="text-sm font-semibold text-textColor">
              ({allSongs[songIndex]?.category})
            </span>
          </p>

          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="cursor-pointer text-textColor hover:text-headingColor" />
          </motion.i>
        </div>

        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>

        {isPlayList && <PlayListCard />}
      </div>
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: data.data,
        });
      });
    }
  }, []);

  //   update song index
  const setCurrentPlaysong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== songindex) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songindex,
      });
    }
  };

  return (
    <div className="max-x-[350px] scrollbar-thin absolute bottom-24 left-4 z-50 flex h-510 max-h-[510px] w-350 flex-col gap-2 overflow-y-scroll rounded-md bg-primary py-2 shadow-md">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group flex w-full cursor-pointer items-center gap-3 bg-transparent p-4 hover:bg-card"
            onClick={() => setCurrentPlaysong(index)}
            key={index}
          >
            <IoMusicalNote className="cursor-pointer text-2xl text-textColor group-hover:text-headingColor" />

            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-headingColor">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-sm font-semibold text-textColor">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <div>nothhing</div>
      )}
    </div>
  );
};

export default MusicPlayer;
