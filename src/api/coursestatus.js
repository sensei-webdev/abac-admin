import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCourseStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/course-status-count`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course status:", error);
    return null;
  }
};
