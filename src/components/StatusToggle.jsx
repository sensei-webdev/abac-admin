import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const StatusToggle = ({ id, initialStatus }) => {
  const [active, setActive] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.patch(
        `${BASE_URL}/courseapi/toggle-status/${id}`
      );
      setActive(res.data.activeStatus);
    } catch (err) {
      console.error("Toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={toggleStatus}
      className={`
        w-16 h-8 flex items-center rounded-full p-1 cursor-pointer 
        transition-all duration-300
        ${active ? "bg-green-500" : "bg-red-500"}
        ${loading ? "opacity-60 cursor-wait" : "cursor-pointer"}
      `}
    >
      <div
        className={`
          w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300
          ${active ? "translate-x-8" : "translate-x-0"}
        `}
      ></div>
    </div>
  );
};

export default StatusToggle;
