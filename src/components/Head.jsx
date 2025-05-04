import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Head = () => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const handleToogleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="flex items-center justify-between bg-white sticky top-0 p-4 z-10">
      {/* Logo & Menu */}
      <div className="flex items-center">
        <div
          onClick={handleToogleMenu}
          className="p-3 cursor-pointer hover:bg-gray-200 rounded-full"
        >
          <RxHamburgerMenu className="text-2xl" />
        </div>
        <img
          className="w-[130px] ml-4"
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="logo"
        />
      </div>

      {/* Search Bar */}
      <div className="flex  flex-1 justify-center max-w-[700px]">
        <div
          className={`relative flex items-center transition-all duration-300 bg-white border border-gray-300 rounded-l-full ${
            isFocused ? "w-[500px] ring-1 ring-blue-400" : "w-[500px]"
          }`}
        >
          {isFocused && (
            <CiSearch className="absolute left-3 text-gray-500" size={20} />
          )}
          <input
            type="search"
            placeholder="Search"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full py-2 pl-10 pr-4 text-md bg-transparent rounded-full focus:outline-none`}
          />
        </div>
        <button className=" bg-gray-100 inset-shadow-2xs p-2 px-6 rounded-r-full hover:bg-gray-200 transition">
          <CiSearch className="text-xl" />
        </button>
        <div className="p-3 ml-[30px] bg-gray-100 hover:bg-gray-200 rounded-full">
          <PiMicrophoneFill className="text-2xl" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-black font-semibold bg-gray-100 hover:bg-gray-200 p-2 px-4 rounded-full">
          <FiPlus className="text-2xl" />
          Create
        </button>
        <Badge badgeContent={4} color="error">
          <NotificationsNoneIcon fontSize="large" />
        </Badge>
        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
      </div>
    </div>
  );
};

export default Head;
