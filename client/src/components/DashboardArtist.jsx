import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllArtists } from "../api";
import SongCard from "./SongCard";

const DashboardArtist = () => {
  const [{ allArtists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: "SET_ALL_ARTISTS",
          allArtists: data.data,
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
              Count : {allArtists?.length}
            </span>
          </p>
        </div>

        <ArtistContainer data={allArtists} />
      </div>
    </div>
  );
};

export const ArtistContainer = ({ data }) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-evenly gap-4">
      {data &&
        data.map((artist, index) => (
          <SongCard key={index} data={artist} index={index} type="artist" />
        ))}
    </div>
  );
};

export default DashboardArtist;
