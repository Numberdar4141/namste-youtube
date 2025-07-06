import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Head = () => {
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <header className="sticky top-0 z-50  bg-white/95 backdrop-blur-md ">
      <div className="flex items-center justify-between px-4 py-2 max-w-[1600px] mx-auto">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>

          <img
            className="w-[100px] cursor-pointer"
            src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
            alt="YouTube Logo"
          />
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 mx-6 max-w-2xl">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
            <FiPlus className="text-xl" />
            Create
          </button>

          <Badge badgeContent={4} color="error">
            <NotificationsNoneIcon fontSize="medium" />
          </Badge>

          <Avatar alt="User" src="/static/images/avatar/1.jpg" />
        </div>
      </div>
    </header>
  );
};

export default Head;
