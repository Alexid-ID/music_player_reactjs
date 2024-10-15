import React from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";

const SongCard = ({ data, index }) => {
  return (
    <motion.div className="relative flex w-40 min-w-210 cursor-pointer flex-col items-center rounded-lg bg-gray-100 p-4 px-2 shadow-md hover:bg-card">
      <div className="relative h-40 min-h-[160px] w-40 min-w-[160px] overflow-hidden rounded-lg drop-shadow-lg">
        <motion.div>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={data.imageUrl}
            className="round-lg h-full w-full object-cover"
          />
        </motion.div>
      </div>
      <p className="text-headingcolor my-2 text-base font-semibold">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        <span className="my-1 block text-sm text-gray-400">
          {data.artist.length > 25
            ? `${data.artist.slice(0, 25)}..`
            : data.artist}
        </span>
      </p>

      <div className="items=center absolute bottom-2 right-2 flex w-full justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
        >
          <IoTrash />
        </motion.i>
      </div>
    </motion.div>
  );
};

export default SongCard;
