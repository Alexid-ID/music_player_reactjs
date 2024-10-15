import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";

import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { SongCard } from ".";

const DashboardSongs = () => {
  const [setsongFilter, setSetsongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allSongs }, dispatch] = useStateValue();

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

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <div className="flex w-full items-center justify-center gap-20">
        <NavLink
          to={"/dashboard/newSong"}
          className="jusce hover:border-gray500 flex cursor-pointer items-center rounded-md border border-gray-300 px-4 py-3 hover:shadow-md"
        >
          <IoAdd />
        </NavLink>
        <input
          className={`w-52 border px-4 py-2 ${isFocus ? "boder-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent text-base outline-none transition-all duration-150 ease-in-out`}
          type="text"
          placeholder="Seach Here..."
          value={setsongFilter}
          onChange={(e) => setSetsongFilter(e.target.value)}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="cursor-pointer text-3xl text-textColor" />
        </i>
      </div>

      {/* Main Container */}
      <div className="relative my-4 w-full rounded-md border border-gray-300 p-4 py-12">
        {/* The count */}
        <div className="absolute left-4 top-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count : {allSongs?.length}
            </span>
          </p>
        </div>

        <SongContainer data={allSongs} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-evenly">
      {data &&
        data.map((song, index) => (
          <SongCard key={index} data={song} index={index} />
        ))}
    </div>
  );
};

export default DashboardSongs;
