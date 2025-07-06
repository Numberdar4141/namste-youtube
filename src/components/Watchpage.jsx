import React from "react";
import MainVedio from "./MainVedio";
import MixVedio from "./MixVedio";
import MainVedioDetails from "./MainVedioDetails";
import CommentList from "./WatchPage/Comment";

const Watchpage = () => {
  return (
    <div className="container mx-auto overflow-x-hidden">
      <div className="flex w-full px-6 gap-6">
        <div className="flex-1">
          <MainVedio />
          <MainVedioDetails />
          <CommentList />
        </div>
        <MixVedio />
      </div>
    </div>
  );
};

export default Watchpage;
