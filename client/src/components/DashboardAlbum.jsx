import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums } from "../api";
import SongCard from "./SongCard";

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      {/* Main Container */}
      <div className="relative my-4 w-full rounded-md border border-gray-300 p-4 py-12">
        {/* The count */}
        <div className="absolute left-4 top-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count : {allAlbums?.length}
            </span>
          </p>
        </div>

        <AlbumContainer data={allAlbums} />
      </div>
    </div>
  );
};

export const AlbumContainer = ({ data }) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-evenly gap-4">
      {data &&
        data.map((artist, index) => (
          <SongCard key={index} data={artist} index={index} type="album" />
        ))}
    </div>
  );
};

export default DashboardAlbum;
