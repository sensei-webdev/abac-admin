import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "./dashboard.css";

const TotalCourse = () => {
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/courseapi/course-status-count"
        );

        setActive(res.data.data.activeCourses);
        setInactive(res.data.data.inactiveCourses);
      } catch (error) {
        console.log("Error fetching course status:", error);
      }
    };

    fetchStatus();
  }, []);

  const total = active + inactive;

  const chartData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: ["#22c55e", "#ef4444"], // green , red
        borderWidth: 0,
      },
    ],
  };

  return (
    <Link to="/courses" className="dashboardLinks">
      <div className="font-semibold text-xl flex justify-between items-center">
        <span>Total Courses</span>
        <span className="font-bold text-5xl">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="w-32 mx-auto">
        <Doughnut
          data={chartData}
          options={{
            cutout: "70%",
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>

      <p className="text-md mt-auto">
        Active: <span className="font-bold">{active}</span> | Inactive:{" "}
        <span className="font-bold">{inactive}</span>
      </p>

      <p className="text-xs">Click to add, edit or remove courses</p>
    </Link>
  );
};

export default TotalCourse;
