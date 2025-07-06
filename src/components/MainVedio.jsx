import { useSearchParams } from "react-router-dom";

const MainVedio = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  return (
    <div className="basis-[70%] flex-1 mt-3">
      {videoId ? (
        <iframe
          className="w-full rounded-2xl aspect-video"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
          title="YouTube video player"
          frameBorder="1"
          allowFullScreen
        />
      ) : (
        <p className="text-gray-500">No video selected</p>
      )}
    </div>
  );
};

export default MainVedio;
