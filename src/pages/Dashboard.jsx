import React from "react";
import { Link } from "react-router-dom";
import TotalCourse from "../dashboardCards/TotalCourse";
import TotalNews from "../dashboardCards/TotalNews";
import TotalUser from "../dashboardCards/TotalUser";
import TotalBlog from "../dashboardCards/TotalBlog";

const Dashboard = () => {
  return (
    <main className="grid grid-cols-4 grid-rows-4 h-8/9 gap-4 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-4">
      <div className="row-span-2">
        <TotalCourse />
      </div>

      <div className="dashboardLinks"></div>
      <div className="dashboardLinks"></div>

      <div className="row-span-2">
        <TotalNews />
      </div>

      <div className="dashboardLinks col-span-2 col-start-2 row-span-2"></div>

      <div className="row-span-2 row-start-3">
        <TotalUser />
      </div>

      <div className="dashboardLinks col-start-2 row-start-4"></div>
      <div className="dashboardLinks col-start-3 row-start-4"></div>

      <div className="row-span-2 col-start-4 row-start-3">
        <TotalBlog />
      </div>
    </main>
  );
};

export default Dashboard;
