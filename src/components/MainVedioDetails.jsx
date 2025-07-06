import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchVedioDetails } from "../api/api";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const MainVedioDetails = () => {
  const [vedioDetails, setVedioDetails] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    const getVedioDetails = async () => {
      try {
        const data = await fetchVedioDetails(videoId);
        setVedioDetails(data.items[0]);
      } catch (error) {
        console.error("Error fetching video detail:", error);
      }
    };
    if (videoId) getVedioDetails();
  }, [videoId]);

  if (!vedioDetails) return null;

  const { snippet, statistics } = vedioDetails;
  const description = snippet.description;
  const shortDesc = description.split("\n").slice(0, 2).join("\n");

  return (
    <div className="w-full flex flex-col gap-3 px-2 pt-4">
      <h1 className="text-xl font-bold">{snippet.title}</h1>

      <div className="flex items-center justify-between flex-wrap gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-3 font-medium">
          <img
            src={`https://ui-avatars.com/api/?name=${snippet.channelTitle}&background=random`}
            alt="channel"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-black">
              {snippet.channelTitle}
            </span>
            <span className="text-xs text-gray-500">1.93M subscribers</span>
          </div>
          <button className="bg-black text-white rounded-full px-4 py-2 text-sm ml-2 hover:opacity-90">
            Subscribe
          </button>
        </div>

        <div className="flex items-center gap-2 text-black">
          <button className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200">
            <ThumbUpAltOutlinedIcon fontSize="small" />
            <span>{Number(statistics.likeCount).toLocaleString()}</span>
          </button>
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <ThumbDownOffAltOutlinedIcon fontSize="small" />
          </button>
          <button className="bg-gray-100 px-3 py-2 rounded-full flex items-center gap-1 hover:bg-gray-200">
            <ShareOutlinedIcon fontSize="small" />
            Share
          </button>
          <button className="bg-gray-100 px-3 py-2 rounded-full flex items-center gap-1 hover:bg-gray-200">
            <FileDownloadOutlinedIcon fontSize="small" />
            Download
          </button>
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <MoreHorizIcon />
          </button>
        </div>
      </div>

      <div className="bg-[#f2f2f2] rounded-xl px-4 py-3 text-md whitespace-pre-wrap">
        <div className="font-semibold text-black mb-1">
          {Number(statistics.viewCount).toLocaleString()} views •{" "}
          {new Date(snippet.publishedAt).toLocaleDateString()}
        </div>
        <div>
          {showFullDesc ? description : shortDesc}
          {description.split("\n").length > 2 && (
            <span
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-md font-semibold text-black cursor-pointer ml-1"
            >
              {showFullDesc ? "Show less" : "... Show more"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainVedioDetails;
