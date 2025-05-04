import React from "react";

const VedioCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className=" cursor-pointer">
      <img className="rounded-md  " src={thumbnails?.maxres?.url } alt="" />
      <p className="font-semibold mt-2 text-lg">{title}</p>
      <p>{channelTitle}</p>
      <p>{statistics?.viewCount} views</p>
    </div>
  );
};

export default VedioCard;
