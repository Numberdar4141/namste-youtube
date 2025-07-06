import React, { useEffect, useState } from "react";
import ChannelHeader from "./ChannelHeader";
import ChannelTabs from "./ChannelTabs";
import VideoGrid from "./VedioGrid";
import { useParams } from "react-router-dom";
import {
  getChannelBanner,
  getChannelByHandle,
  getChannelVideos,
} from "../../api/api";

const ChannelMain = () => {
  const { username } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const channel = await getChannelByHandle(username); // returns [channelData]
      const singleChannel = channel[0];
      setChannelData(singleChannel);

      const videoList = await getChannelVideos(singleChannel.id);
      setVideos(videoList);
    };

    fetchData();
  }, [username]);
  return (
    <div className="flex flex-col  mx-auto md:items-center max-w-7xl">
      <ChannelHeader banner={banner} data={channelData} />
      <ChannelTabs />
      <VideoGrid videos={videos} />
    </div>
  );
};

export default ChannelMain;
