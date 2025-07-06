import { formatSubscribers, formatVideos } from "../../utils/functions";


const ChannelHeader = ({ data }) => {
  if (!data) return null;

  const { brandingSettings, snippet, statistics } = data;

  return (
    <div className="w-full bg-white rounded-b-xl  overflow-hidden">
      {/* Banner */}
      <img
        src={
          brandingSettings?.image?.bannerExternalUrl ||
          "https://via.placeholder.com/1024x200"
        }
        alt="Channel banner"
        className="w-full h-56 md:h-64  mt-4 rounded-3xl object-cover"
      />

      {/* Info */}
      <div className="flex flex-col md:flex-row gap-6 px-6 py-4 items-start md:items-center max-w-7xl mx-auto">
        {/* Channel Logo */}
        <img
          src={snippet?.thumbnails?.high?.url}
          alt="Channel logo"
          className="w-48  rounded-full -mt-12 border-4 border-white"
        />

        {/* Details */}
        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-3xl font-bold">{snippet?.title}</h2>
          <p className="text-gray-700 text-sm font-medium">
          <span className="text-black text-sm font-semibold">{snippet?.customUrl} </span>  •{" "}
            {formatSubscribers(statistics?.subscriberCount)} •{" "}
            {formatVideos(statistics?.videoCount)}
          </p>
          <p className="text-sm text-gray-700 max-w-2xl line-clamp-2">
            {brandingSettings?.channel?.description}
          </p>
          {/* Optional: show "youtube.be/..." link if available in brandingSettings.channel.links */}
        </div>

        {/* Subscribe Button */}
        <div className="ml-auto">
          <button className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:opacity-90">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
