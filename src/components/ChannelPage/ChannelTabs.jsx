const ChannelTabs = () => {
  return (
    <div className="border-b border-gray-300 px-6">
      <ul className="flex space-x-6 font-medium text-gray-600">
        <li className="cursor-pointer border-b-2 border-black text-black pb-2">
          Videos
        </li>
        <li className="cursor-pointer pb-2 hover:text-black">Playlists</li>
        <li className="cursor-pointer pb-2 hover:text-black">About</li>
      </ul>
    </div>
  );
};

export default ChannelTabs;
