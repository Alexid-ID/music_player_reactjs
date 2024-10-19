import React from "react";
import { BsEmojiWink } from "react-icons/bs";
import { motion } from "framer-motion";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 200 }}
      key={type}
      className={`fixed right-12 top-12 flex items-center justify-center rounded-md px-4 py-2 shadow-xl backdrop-blur-md 
        ${type === "success" && "bg-green-500"}
        ${type === "danger" && "bg-red-500"}
        `}
    >
        {
            type === "success" && 
            (<div className="flex items-center justify-center gap-4">
                <BsEmojiWink className="text-3x; text-primary" />
                <p className="text-x; font-semibold
                 text-primary">Data saved</p>
            </div>)
        }

        {
            type === "danger" && 
            (<div className="flex items-center justify-center gap-4">
                <BsEmojiWink className="text-3x; text-primary" />
                <p className="text-x; font-semibold
                 text-primary">Something went wrong...please try again later</p>
            </div>)
        }
    </motion.div>
  );
};

export default Alert;
