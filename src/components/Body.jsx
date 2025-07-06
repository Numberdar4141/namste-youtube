import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Body = () => {
  return (
    <div className="flex h-[calc(100vh-56px)] no-scrollbar overflow-hidden">
      <Sidebar />
      <main className="flex-1 no-scrollbar overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;
