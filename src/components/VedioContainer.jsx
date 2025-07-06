import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchYoutubeVedioData, getChannelDetails } from "../api/api";
import { Grid, CircularProgress, Box } from "@mui/material";
import { Link } from "react-router-dom";
import VideoCard from "./VedioCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [channelDetailsMap, setChannelDetailsMap] = useState({});
  const loaderRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const handleHover = (id) => {
    setHoveredId(id);
  };

  const handleLeave = () => {
    setHoveredId(null);
  };

  const getVideos = async (token = "") => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchYoutubeVedioData(10, token);
      const newVideos = data.items || [];
      setVideos((prev) => [...prev, ...newVideos]);
      setNextPageToken(data.nextPageToken);

      // 🔍 Collect unique and uncached channel IDs
      const uniqueUncachedChannelIds = [
        ...new Set(
          newVideos
            .map((video) => video.snippet?.channelId)
            .filter((id) => id && !channelDetailsMap[id])
        ),
      ];

      // 📦 Batch fetch channel details if any
      if (uniqueUncachedChannelIds.length > 0) {
        const channelIdsCSV = uniqueUncachedChannelIds.join(",");
        const result = await getChannelDetails(channelIdsCSV);

        if (result?.length > 0) {
          const newDetails = {};
          result.forEach((item) => {
            newDetails[item.id] = item;
          });

          setChannelDetailsMap((prev) => ({
            ...prev,
            ...newDetails,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextPageToken && !isLoading) {
          getVideos(nextPageToken);
        }
      },
      { threshold: 0.2 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextPageToken, isLoading]);

  return (
    <Box sx={{ px: "20px", mt: "20px" }}>
      {error && (
        <Box sx={{ color: "red", mb: 2, textAlign: "center" }}>{error}</Box>
      )}
      <Grid container spacing={4}>
        {videos.map((video) => {
          const channelId = video.snippet?.channelId;
          return (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
              <Link to={`/watch?v=${video.id}`}>
                <VideoCard
                  key={video.id}
                  channelId={channelId}
                  channelDetails={channelDetailsMap[channelId] || null}
                  hoveredId={hoveredId}
                  onHover={handleHover}
                  onLeave={handleLeave}
                  info={video}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <div ref={loaderRef} style={{ height: "10px" }} />
    </Box>
  );
};

export default VideoContainer;
