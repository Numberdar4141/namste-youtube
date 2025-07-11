import React from "react";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Shorts
import { Link } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, isMenuOpen, link }) => (
  <Link to={link}>
    <div
      className={
        isMenuOpen
          ? "p-3 rounded-lg flex items-center font-semibold hover:bg-gray-100 cursor-pointer"
          : "p-3 mx-auto rounded-lg grid hover:bg-gray-100 cursor-pointer"
      }
    >
      <Icon fontSize="medium" />
      {isMenuOpen && (
        <p className="ml-[20px] text-sm truncate my-auto">{label}</p>
      )}
    </div>
  </Link>
);

const Sidebar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  const sidebarItems = [
    { icon: HomeIcon, label: "Home", link: "/" },
    { icon: WhatshotIcon, label: "Shorts" },
    { icon: SubscriptionsIcon, label: "Subscriptions" },
    { icon: VideoLibraryIcon, label: "Library" },
    { icon: HistoryIcon, label: "History" },
    { icon: SlideshowIcon, label: "Your Videos" },
    { icon: WatchLaterIcon, label: "Watch Later" },
    { icon: ThumbUpAltIcon, label: "Liked Videos" },
    { icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <div
      className={`bg-white overflow-y-auto sticky top-[56px] h-[calc(100vh-56px)] px-2.5 ${
        isMenuOpen ? "w-[200px]" : "w-[72px]"
      } transition-all duration-200`}
    >
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          link={item.link}
          isMenuOpen={isMenuOpen}
        />
      ))}
    </div>
  );
};

export default Sidebar;
