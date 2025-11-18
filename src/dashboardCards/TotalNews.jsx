import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard.css";

const TotalNews = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get("http://localhost:8000/newsapi/news/count");
        setCount(res.data.count);
      } catch (error) {
        console.log("Error fetching news count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <Link to="/news" className="dashboardLinks row-span-2">
      <span className="font-semibold text-xl">Total News</span>
      <span className="font-bold text-5xl">
        {String(count).padStart(2, "0")}
      </span>
      <p className="text-xs mt-auto">Click to add, edit or remove news</p>
    </Link>
  );
};

export default TotalNews;
