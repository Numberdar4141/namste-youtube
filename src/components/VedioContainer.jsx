import React, { useEffect, useState } from "react";
import { fetchYoutubeVedioData } from "../api/api";
import VedioCard from "./VedioCard";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const VedioContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchYoutubeVedioData();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideos();
  }, []);

  return (
    <Grid sx={{ px: "20px", mt: "20px" }} container spacing={4}>
      {videos.map((video, index) => (
        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Link to={`/watch?v=`+ video.id}>
            <VedioCard info={video} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default VedioContainer;
