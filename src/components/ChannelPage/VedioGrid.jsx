import { Grid } from "@mui/material";
import VideoCard from "../VedioCard";

const VideoGrid = ({ videos }) => {
  if (!videos?.length) return <p className="p-6">No videos available</p>;

  return (
    <Grid container spacing={2}>
      {videos?.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <VideoCard key={video.id} info={video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid;
