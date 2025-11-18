// src/components/forms/ShowCourse.jsx
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  BookOpen,
  Layers,
  Clock,
  Users,
  Star,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import StatusToggle from "../components/StatusToggle";

const ShowCourse = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-900 text-white p-5">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen size={22} /> {course.courseName}
          </h2>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-red-400 transition text-3xl ml-3"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Image */}
        <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={course.courseName}
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

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="flex gap-3 items-start">
            <Layers className="text-gray-700 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              {course.description || "-"}
            </p>
          </div>

          {/* 3 Column Info */}
          <div className="grid grid-cols-3 gap-4">
            <InfoCard
              icon={<Layers size={20} />}
              label="Category"
              value={course.category}
            />

            <InfoCard
              icon={<Clock size={20} />}
              label="Duration"
              value={`${course.duration} ${course.durationType}`}
            />

            <InfoCard
              icon={<Users size={20} />}
              label="Students"
              value={course.students}
            />

            <InfoCard
              icon={<Star size={20} className="text-yellow-500" />}
              label="Rating"
              value={course.rating}
            />

            <InfoCard
              icon={<IndianRupee size={20} />}
              label="Total Fee"
              value={`₹${Number(course.totalFee || 0).toLocaleString("en-IN")}`}
            />

            {/* Created At */}
            <InfoCard
              icon={<CalendarDays size={20} />}
              label="Created"
              value={
                course.createdAt
                  ? new Date(course.createdAt).toLocaleString("en-GB")
                  : course.dateCreated
                  ? new Date(course.dateCreated).toLocaleString("en-GB")
                  : "-"
              }
            />

            {/* Last Updated */}
            <InfoCard
              icon={<CalendarDays size={20} />}
              label="Last Updated"
              value={
                course.updatedAt
                  ? new Date(course.updatedAt).toLocaleString("en-GB")
                  : "-"
              }
            />

            {/* Active/Deleted Status */}
            <InfoCard
              icon={<ShieldCheck size={20} />}
              label="Status"
              value={course.activeStatus ? "Active" : "Inactive"}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Info Box Component
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gray-100 p-4 rounded-xl shadow-sm border border-gray-200">
    <div className="flex flex-col items-start gap-1">
      <span className="flex items-center gap-2 text-gray-600 text-sm font-medium">
        {icon} {label}
      </span>
      <span className="text-gray-900 font-semibold">{value || "-"}</span>
    </div>
  </div>
);

export default ShowCourse;
