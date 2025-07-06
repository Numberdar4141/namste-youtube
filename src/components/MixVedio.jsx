import React, { useEffect, useState } from "react";
import { fetchRelatedVideos, fetchVedioDetails } from "../api/api";
import MixCard from "./Card/mixCard";
import { Link, useSearchParams } from "react-router-dom";

const MixVedio = () => {
  const [videos, setVideos] = useState([]);
  console.log("🚀 ~ MixVedio ~ videos:", videos)
  const [vedioDetails, setVedioDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  // Step 1: Fetch Video Details
  useEffect(() => {
    const getVedioDetails = async () => {
      try {
        const data = await fetchVedioDetails(videoId);
        const details = data.items[0];
        setVedioDetails(details);

        if (details?.snippet?.categoryId) {
          const related = await fetchRelatedVideos(
            details.snippet.categoryId,
            details.snippet.tags
          );
          setVideos(related.items);
          console.log("🚀 ~ MixVedio ~ related:", related)
        }
      } catch (error) {
        console.error("Error fetching video detail or related videos:", error);
      }
    };

    if (videoId) getVedioDetails();
  }, [videoId]);

  return (
    <div className="basis-[35%] flex flex-col h-full rounded-lg overflow-hidden">
      <div className="overflow-y-auto flex-1">
        <div className="p-4">
          {videos?.map((video) => (
            <div key={video.id.videoId || video.id} className="mb-3">
              <Link to={`/watch?v=${video.id.videoId || video.id}`}>
                <MixCard info={video} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MixVedio;
