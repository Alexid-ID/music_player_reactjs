import React from "react";
import { useStateValue } from "../context/StateProvider";
import { changingUserRole, getAllUsers, deleteUser } from "../api/index";
import { actionType } from "../context/reducer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import moment from "moment";

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      {/* filter */}
      <div className=""></div>

      {/* tabular data form */}
      <div className="relative my-4 flex min-h-[1400px] w-full flex-col items-center justify-start gap-3 overflow-x-scroll rounded-md border border-gray-300 p-4 py-12">
        {/* total count of the user */}
        <div className="absolute left-4 top-4">
          <p className="text-xl font-semibold">
            Count{" "}
            <span className="text-sm font-bold text-textColor">
              {allUsers?.length}
            </span>
          </p>
        </div>

        {/* table header */}
        <div className="flex w-full min-w-[750px] items-center justify-between">
          <p className="w-275 min-w-[160px] text-center text-sm font-semibold text-textColor">
            Image
          </p>
          <p className="w-275 min-w-[160px] text-center text-sm font-semibold text-textColor">
            Name
          </p>
          <p className="w-275 min-w-[160px] text-center text-sm font-semibold text-textColor">
            Email
          </p>
          <p className="w-275 min-w-[160px] text-center text-sm font-semibold text-textColor">
            Verified
          </p>
          <p className="w-275 min-w-[160px] text-center text-sm font-semibold text-textColor">
            Created
          </p>
          <p className="w-275 min-w-[160px] text-center text-sm font-semibold text-textColor">
            Role
          </p>{" "}
        </div>

        {/* table body content */}
        <div className="flex w-full min-w-[750px] flex-col items-center justify-start gap-3">
          {allUsers?.map((user, index) => (
            <DashboardUserCard key={index} data={user} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardUserCard = ({ data, index }) => {
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const createdAt = moment(new Date(data?.createdAt)).format("MMMM Do YYYY");

  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };

  const deleteaUser = (userId) => {
    deleteUser(userId).then((res) => {
	  if (res) {
		getAllUsers().then((data) => {
		  dispatch({
			type: actionType.SET_ALL_USERS,
			allUsers: data.data,
		  });
		});
	  }
	});
  };

  return (
    <motion.div className="hover:shadown-md relative flex w-full cursor-pointer items-center justify-between rounded-md bg-lightOverlay py-4 hover:bg-card">
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-md bg-gray-200"
          onClick={() => deleteaUser(data._id)}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}

      {/* user image */}
      <div className="w-75 flex min-w-[160px] items-center justify-center">
        <img
          src={data?.imageUrl}
          alt="user"
          className="h-10 w-10 min-w-[40px] rounded-md object-cover shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* user name */}
      <p className="w-275 min-w-[160px] text-center text-base text-textColor">
        {data?.name}
      </p>
      {/* user email */}
      <p className="w-275 min-w-[160px] text-center text-base text-textColor">
        {data?.email}
      </p>
      {/* user verified */}
      <p className="w-275 min-w-[160px] text-center text-base text-textColor">
        {data?.email_verified ? "True" : "False"}
      </p>
      {/* user created */}
      <span className="w-275 min-w-[160px] text-center text-base text-textColor">
        {createdAt}
      </span>

      <div className="relative flex w-275 min-w-[160px] items-center justify-center gap-6 text-center">
        <p className="text-center text-base text-textColor">{data?.role}</p>
        <div className="rounded-sm bg-purple-200 px-1 text-[10px] font-semibold text-textColor hover:shadow-md">
          {data._id !== user?.user._id && (
            <motion.p
              whileTap={{ scale: 0.75 }}
              className="text-[10px] font-semibold text-textColor hover:shadow-md"
              onClick={() => setIsUserRoleUpdated(true)}
            >
              {data?.role === "admin" ? "member" : "admin"}
            </motion.p>
          )}

          {isUserRoleUpdated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-4 top-6 z-10 flex flex-col items-center gap-4 rounded-md bg-white p-4 shadow-md"
            >
              <p className="text-[12px] font-semibold text-textColor">
                Are you sure, do you want to mark the user as
                <span>{data?.role === "admin" ? " Member" : " Admin"} ?</span>
              </p>

              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="rounded-sm border-none bg-blue-200 px-4 py-1 text-sm text-black outline-none hover:shadow-md"
                  onClick={() =>
                    updateUserRole(
                      data._id,
                      data?.role === "admin" ? "member" : "admin",
                    )
                  }
                >
                  Yes
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="rounded-sm border-none bg-gray-200 px-4 py-1 text-sm text-black outline-none hover:shadow-md"
                  onClick={() => setIsUserRoleUpdated(false)}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardUsers;
