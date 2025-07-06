import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

const MixCard = ({ info }) => {
  const [loading, setLoading] = useState(true);
  const { snippet, statistics } = info || {};
  const { channelTitle, title, thumbnails } = snippet || {};

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // faster load mimic
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex gap-2 cursor-pointer">
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="45%"
          height={110}
          sx={{ borderRadius: "12px", bgcolor: "grey.300" }}
        />
      ) : (
        <img
          className="rounded-lg w-[33%] object-contain h-auto"
          src={thumbnails?.high?.url || thumbnails?.high?.url}
          alt={title}
        />
      )}

      <div className=" flex w-full">
        <div className=" w-full">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ bgcolor: "grey.300" }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={20}
                sx={{ bgcolor: "grey.300" }}
              />
              <Skeleton
                variant="text"
                width="50%"
                height={20}
                sx={{ bgcolor: "grey.300", mt: 1 }}
              />
              <Skeleton
                variant="text"
                width="30%"
                height={20}
                sx={{ bgcolor: "grey.300" }}
              />
            </>
          ) : (
            <>
              <p className="font-semibold w-[80%]  text-md line-clamp-2">
                {title}
              </p>
              <p className="text-xs text-gray-600">{channelTitle}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MixCard;
