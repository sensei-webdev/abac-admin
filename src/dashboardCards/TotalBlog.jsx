import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const TotalBlog = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogapi/blogs/count`);
        setCount(res.data.count);
      } catch (error) {
        console.log("Error fetching blog count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <Link to="/blog" className="dashboardLinks">
      <span className="font-semibold text-xl">Total Blog</span>
      <span className="font-bold text-5xl">
        {String(count).padStart(2, "0")}
      </span>
      <p className="text-xs mt-auto">Click to add, edit or remove blog</p>
    </Link>
  );
};

export default TotalBlog;
