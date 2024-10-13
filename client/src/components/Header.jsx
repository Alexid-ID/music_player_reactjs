import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { useStateValue } from "../context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebases.config";
import { motion } from "framer-motion";

import { FaCrown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex w-full items-center bg-gray-100 p-4 md:px-6 md:py-2">
      <NavLink to={"/"}>
        <img src={Logo} className="w-16" alt="" />
      </NavLink>

      <ul className="ml-7 flex items-center justify-center">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="relative ml-auto flex cursor-pointer items-center gap-2"
      >
        <img
          className="h-12 w-12 min-w-[44px] rounded-full object-cover shadow-lg"
          src={user?.user.imageUrl}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-textColor hover:text-headingColor">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs font-normal text-gray-500">
            Premium Member.
            <FaCrown className="text-xm -ml-1 text-yellow-500" />
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute right-0 top-12 z-10 flex w-275 flex-col gap-2 rounded-lg bg-card p-3 shadow-lg backdrop-blur-sm"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-textcolor text-base transition-all duration-150 ease-in-out hover:font-semibold">
                Profile
              </p>
            </NavLink>
            <p className="text-textcolor text-base transition-all duration-150 ease-in-out hover:font-semibold">
              My Favourites
            </p>
            <hr />
            <p
              className="text-textcolor text-base transition-all duration-150 ease-in-out hover:font-semibold"
              onClick={logOut}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
