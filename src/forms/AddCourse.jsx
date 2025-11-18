// src/components/forms/CourseForm.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const shortenNumber = (num) => {
  if (!num) return "";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
  return String(num);
};

const CourseForm = ({
  onClose,
  isUpdate = false,
  courseData = null,
  onSaved,
}) => {
  const [form, setForm] = useState({
    image: "",
    courseName: "",
    description: "",
    category: "",
    duration: "",
    durationType: "month",
    students: "",
    shortStudents: "",
    rating: "",
    totalFee: "",
    feePerDuration: "",
    activeStatus: true,
  });

  // prefill for update
  useEffect(() => {
    if (isUpdate && courseData) {
      setForm({
        image: courseData.image || "",
        courseName: courseData.courseName || "",
        description: courseData.description || "",
        category: courseData.category || "",
        duration: courseData.duration || "",
        durationType: courseData.durationType || "month",
        students: courseData.students || "",
        shortStudents:
          courseData.shortStudents || shortenNumber(courseData.students),
        rating: courseData.rating || "",
        totalFee: courseData.totalFee || "",
        activeStatus: courseData.activeStatus ?? true,
        feePerDuration: courseData.feePerDuration || "",
      });
    }
  }, [isUpdate, courseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading(isUpdate ? "Updating..." : "Saving...");
    try {
      if (isUpdate && courseData?._id) {
        await axios.put(
          `${BASE_URL}/courseapi/update/course/${courseData._id}`,
          form
        );
        toast.success("Course updated", { id: loading });
      } else {
        await axios.post(`${BASE_URL}/courseapi/course`, form);
        toast.success("Course added", { id: loading });
      }

      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: loading });
    }
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "totalFee") {
      setForm((s) => ({
        ...s,
        totalFee: value,
        feePerDuration: s.duration
          ? (Number(value) / Number(s.duration)).toFixed(0)
          : "",
      }));
      return;
    }

    if (name === "feePerDuration") {
      setForm((s) => ({
        ...s,
        feePerDuration: value,
        totalFee: s.duration
          ? (Number(value) * Number(s.duration)).toFixed(0)
          : "",
      }));
      return;
    }

    if (name === "students") {
      setForm((s) => ({
        ...s,
        students: value,
        shortStudents: shortenNumber(Number(value)),
      }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10 space-y-6">
      <h2 className="text-xl font-semibold">
        {isUpdate ? "Update Course" : "Add Course"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded-2xl">
          {form.image ? (
            <img
              src={form.image}
              alt={form.formName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Course Image URL *</label>
          <input
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="https://example.com/img.jpg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Course Name *</label>
          <input
            name="courseName"
            type="text"
            value={form.courseName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Full Stack Web Dev"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
            placeholder="Write course description..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Course Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select category...</option>
            <option value="basic">Basic</option>
            <option value="advance">Advance</option>
            <option value="programming">Programming</option>
            <option value="office">Office</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Duration *</label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Duration Type *</label>
            <select
              name="durationType"
              value={form.durationType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Students Enrolled *</label>
          <input
            name="students"
            type="number"
            value={form.students}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="1200"
          />
          {form.shortStudents && (
            <p className="text-sm text-gray-500 mt-1">
              Short: {form.shortStudents}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating *</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="4.6"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Total Fee *</label>
            <input
              name="totalFee"
              type="number"
              value={form.totalFee}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="9000"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Fee per {form.durationType}
            </label>
            <input
              name="feePerDuration"
              type="number"
              value={form.feePerDuration}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="3000"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            {isUpdate ? "Update Course" : "Save Course"}
          </button>

          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="px-6 py-2 rounded-xl border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
