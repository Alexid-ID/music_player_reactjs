import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { 
    DashboardHome, 
    DashboardSongs, 
    DashboardUser, 
    DashboardArtist, 
    DashboardAlbum, 
    DashboardNewSong 
} from ".";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center bg-primary">
      <Header />
      <div className="my-2 flex w-[60%] items-center justify-evenly p-4">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          User
        </NavLink>
        <NavLink
          to={"/dashboard/song"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Song
        </NavLink>
        <NavLink
          to={"/dashboard/artist"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Artist
        </NavLink>
        <NavLink
          to={"/dashboard/album"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Album
        </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/song" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/album" element={<DashboardAlbum />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
