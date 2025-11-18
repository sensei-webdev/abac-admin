import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const TotalUser = () => {
  const [count, setcount] = useState(0);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/count`);
        setcount(res.data.count);
      } catch (error) {
        console.log("Error fetching courses count:", error);
      }
    };

    fetchCount();
  }, []);
  return (
    <Link to="/students" className="dashboardLinks">
      <span className="font-semibold text-xl">Total Students</span>
      <span className="font-bold text-5xl">
        {String(count).padStart(2, "0")}
      </span>
      <p className="text-xs mt-auto">Click to add, edit or remove students</p>
    </Link>
  );
};

export default TotalUser;
