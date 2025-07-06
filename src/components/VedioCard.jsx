import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { formatViewCount, getRelativeTime } from "../utils/functions";

const VideoCard = ({
  info,
  hoveredId,
  onHover,
  onLeave,
  channelId,
  channelDetails,
  onChannelClick,
}) => {
  console.log("🚀 ~ channelDetails:", channelDetails)
  const [loading, setLoading] = useState(true);
  const { snippet, statistics, id } = info || {};
  const { channelTitle, title, thumbnails } = snippet || {};
  const channelHandle  = channelDetails?.snippet?.customUrl || {};
  console.log("🚀 ~ channelHandle:", channelHandle)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Mimic loading
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setTimeout(() => {
      onHover(id);
    }, 700);
  };

  const handleMouseLeave = () => {
    onLeave();
  };

  const handleChannelClick = () => {
    if (channelId && !channelDetails) {
      onChannelClick(channelId);
    }
  };

  const isHovered = hoveredId === id;

  return (
    <div
      className="w-full cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "7px",
              bgcolor: "grey.400",
            }}
          />
        ) : isHovered && id ? (
          <iframe
            className="absolute top-0 border-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
            title={title || "YouTube video"}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={
              thumbnails?.maxres?.url ||
              thumbnails?.high?.url ||
              "https://via.placeholder.com/320x180"
            }
            alt={title || "Video thumbnail"}
          />
        )}
      </div>

      <div className="flex mt-3 gap-3">
        {loading ? (
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ bgcolor: "grey.400" }}
          />
        ) : (
          <Link to={`/${channelHandle}`} onClick={handleChannelClick}>
            <img
              src={
                channelDetails?.snippet?.thumbnails?.default?.url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  channelTitle || "Unknown"
                )}&background=random`
              }
              alt="Channel logo"
              className="w-[50px] rounded-full object-contain"
            />
          </Link>
        )}

        <div className="flex flex-col w-full">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width="90%"
                height={20}
                sx={{ bgcolor: "grey.400" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "grey.400", mt: 1 }}
              />
            </>
          ) : (
            <>
              <p className="font-semibold text-md line-clamp-2">
                {title || "Untitled Video"}
              </p>
              <Link to={`/${channelHandle}`} onClick={handleChannelClick}>
                <p className="text-sm  text-gray-600 hover:text-black">
                  {channelDetails?.snippet?.title ||
                    channelTitle ||
                    "Unknown Channel"}
                </p>
              </Link>
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-600">
                  {statistics?.viewCount
                    ? formatViewCount(Number(statistics.viewCount))
                    : "No views data"}
                </p>
                <span className="text-gray-500">•</span>
                <p className="text-sm text-gray-600">
                  {snippet?.publishedAt
                    ? getRelativeTime(snippet.publishedAt)
                    : "No publish date"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
