import React, { useState, useEffect, useRef } from "react";
import CourseForm from "../forms/AddCourse";
import ShowCourse from "../forms/ShowCourse";
import StatusToggle from "../components/StatusToggle";
import {
  FaPenToSquare,
  FaRegTrashCan,
  FaRegEye,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import "./table.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalType, setModalType] = useState(null); // "add", "edit", "view", "delete"
  const [selectedCourse, setSelectedCourse] = useState(null);

  const modalRef = useRef(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/courseapi/courses`);
      setCourses(res.data.courseData || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openModal = (type, course = null) => {
    setSelectedCourse(course);
    setModalType(type);
  };

  const closeAllModals = () => {
    setModalType(null);
    setSelectedCourse(null);
  };

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeAllModals();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleDelete = async () => {
    if (!selectedCourse) return;

    try {
      await axios.delete(
        `${BASE_URL}/courseapi/delete/course/${selectedCourse._id}`
      );

      toast.success("Course deleted successfully!");

      closeAllModals();
      fetchCourses();
    } catch (err) {
      toast.error("Failed to delete course!");
      console.error("Delete error:", err);
    }
  };

  return (
    <main className="space-y-4">
      <nav className="bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between p-5 rounded-2xl shadow-lg">
        <span className="text-3xl font-semibold text-gray-900 tracking-tight">
          Courses
        </span>
        <button
          onClick={() => openModal("add")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          Add Course
        </button>
      </nav>

      {/* ---------------- MODALS ---------------- */}

      {/* Add / Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10"
          onMouseDown={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div ref={modalRef} className="w-full max-w-2xl">
            <CourseForm
              isUpdate={modalType === "edit"}
              courseData={selectedCourse}
              onClose={closeAllModals}
              onSaved={() => {
                fetchCourses();
                closeAllModals();
              }}
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {modalType === "view" && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10"
          onMouseDown={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div className="w-full max-w-2xl">
            <ShowCourse course={selectedCourse} onClose={closeAllModals} />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Delete Course?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedCourse?.courseName}</strong>? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TABLE ---------------- */}
      <section className="flex mx-auto w-full max-h-[540px] custom-scroll overflow-y-auto rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-white/20">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white/40 backdrop-blur-xl z-20 border-b border-white/20">
            <tr className="text-gray-800 text-sm uppercase tracking-wide">
              <th className="w-12 px-3 py-4 text-left">Sl</th>
              <th className="px-4 py-4 text-left">Course</th>
              <th className="px-4 py-4 text-left">Category</th>
              <th className="px-4 py-4 text-left">Date Created</th>
              <th className="px-4 py-4 text-left">Total Fee</th>
              <th className="px-4 py-4 text-left">Duration</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-900">
            {loading
              ? [...Array(5)].map((_, i) => (
                  <tr
                    key={i}
                    className="animate-pulse border-b border-white/10"
                  >
                    <td className="py-4 px-3">
                      <div className="h-4 w-8 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-32 bg-white/30 rounded mb-2"></div>
                      <div className="h-3 w-20 bg-white/20 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-24 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-20 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-20 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-6 w-16 bg-white/30 rounded"></div>
                    </td>
                  </tr>
                ))
              : courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className={`border-b border-white transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/30"
                    } hover:bg-white/60 backdrop-blur-sm`}
                  >
                    <td className="px-3 py-4">{index + 1}</td>

                    <td className="p-4 w-2/5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 line-clamp-1">
                          {course.courseName}
                        </span>
                        <span className="text-sm text-gray-600 line-clamp-1">
                          {course.description}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 py-4">
                      {course.category
                        ? course.category.charAt(0).toUpperCase() +
                          course.category.slice(1).toLowerCase()
                        : ""}
                    </td>

                    <td className="px-4 py-4">
                      {course.dateCreated
                        ? new Date(course.dateCreated).toLocaleDateString(
                            "en-GB"
                          )
                        : new Date(course.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                    </td>

                    <td className="px-4 py-4">
                      ₹ {Number(course.totalFee || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4">
                      {course.duration} {course.durationType}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-start">
                        <StatusToggle
                          id={course._id}
                          initialStatus={course.activeStatus}
                        />
                      </div>
                    </td>

                    <td className="px-4 py-4 flex gap-4 items-center text-xl">
                      <button
                        onClick={() => openModal("view", course)}
                        className="text-green-500 hover:text-green-700 transition"
                        title="View"
                      >
                        <FaRegEye />
                      </button>

                      <button
                        onClick={() => openModal("edit", course)}
                        className="text-blue-600 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <FaPenToSquare />
                      </button>

                      <button
                        onClick={() => openModal("delete", course)}
                        className="text-red-600 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Courses;
