import React, { useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [{ artistFilter, albumFilter, languageFilter, filterTerm }, dispatch] =
    useStateValue();

  const updateFilterButton = (name) => {
    setFilterName(name);
    setFilterMenu(false);

    if (flag === "Artist") {
      dispatch({
        type: "SET_FILTER_ARTIST",
        artistFilter: name,
      });
    }

    if (flag === "Album") {
      dispatch({
        type: "SET_FILTER_ALBUM",
        albumFilter: name,
      });
    }

    if (flag === "Language") {
      dispatch({
        type: "SET_FILTER_LANGUAGE",
        languageFilter: name,
      });
    }

    if (flag === "Category") {
      dispatch({
        type: "SET_FILTER_TERM",
        filterTerm: name,
      });
    }
  };

  return (
    <div className="relative cursor-pointer rounded-md border border-gray-300 px-4 py-1 hover:border-gray-400">
      <p
        className="flex items-center gap-2 text-base tracking-wide text-textColor"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15
              ? `${filterName.slice(0, 14)}...`
              : filterName}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor transition-all duration-150 ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}`}
        />
      </p>

      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 absolute top-8 z-50 flex max-h-44 w-48 flex-col overflow-y-scroll rounded-md py-2 shadow-md backdrop-blur-sm ${flag === "Category" ? "right-0" : "left-0"}`}
        >
          {filterData?.map((data) => (
            <div
              key={data.name}
              className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === "Artist" || flag === "Album") && (
                <img
                  src={data.imageUrl}
                  className="h-8 w-8 min-w-[32px] rounded-full object-cover"
                  alt=""
                />
              )}
              <p className="w-full">
                {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
