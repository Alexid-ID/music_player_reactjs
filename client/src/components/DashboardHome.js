import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdOutlineLibraryMusic } from "react-icons/md";

import { useStateValue } from "../context/StateProvider";
import {
  getAllUsers,
  getAllArtists,
  getAllAlbums,
  getAllSongs,
} from "../api/index";
import { bgcolors } from "../utils/styles";

export const DashBoardCard = ({ icon, name, count }) => {
    const bg_Color = bgcolors[parseInt(Math.random() * bgcolors.length)];

    

    return (
    <div 
        style={{backgroundColor: bg_Color}}
        className="h-auto w-40 gap-3 rounded-lg  p-4 shadow-md">
      {icon}
      <p className="text-xl font-semibold text-textColor">{name}</p>
      <p className="text-lg text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        // console.log("All Users: ", data);
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: data.data,
        });
      });
    }

    if (!allArtists) {
      getAllArtists().then((data) => {
        console.log("All artists: ", data);
        dispatch({
          type: "SET_ALL_ARTISTS",
          allArtists: data.data,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        console.log("All albums: ", data);
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        console.log("All songs: ", data);
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-wrap items-center justify-evenly p-6">
      <DashBoardCard
        icon={<FaUsers className="text-2xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers.length : 0}
      />
      <DashBoardCard
        icon={<IoIosMusicalNotes className="text-2xl text-textColor" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs.length : 0}
      />
      <DashBoardCard
        icon={<RiUserStarFill className="text-2xl text-textColor" />}
        name={"Artists"}
        count={allArtists?.length > 0 ? allArtists.length : 0}
      />
      <DashBoardCard
        icon={<MdOutlineLibraryMusic className="text-2xl text-textColor" />}
        name={"Albums"}
        count={allAlbums?.length > 0 ? allAlbums.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
