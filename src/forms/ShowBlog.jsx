// src/components/forms/ShowBlog.jsx
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  BookOpen,
  User,
  Layers,
  FileText,
  Timer,
  CalendarDays,
  Tag,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

const ShowBlog = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-900 text-white p-5">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen size={22} /> {blog.title}
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
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
          ) : (
            <span className="text-gray-400 flex items-center gap-2">
              <ImageIcon size={20} /> No Image
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Short Description */}
          <div className="flex gap-3 items-start">
            <FileText className="text-gray-700 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              {blog.shortDescription || "-"}
            </p>
          </div>

          {/* Full Content */}
          <div className="flex gap-3 items-start">
            <FileText className="text-gray-700 mt-1" />
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {blog.content || "-"}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4">
            <InfoCard
              icon={<User size={20} />}
              label="Author"
              value={blog.author}
            />

            <InfoCard
              icon={<Layers size={20} />}
              label="Category"
              value={blog.category}
            />

            <InfoCard
              icon={<Tag size={20} />}
              label="Tags"
              value={blog.tags?.length ? blog.tags.join(", ") : "-"}
            />

            <InfoCard
              icon={<Timer size={20} />}
              label="Reading Time"
              value={`${blog.readingTime || 0} min`}
            />

            <InfoCard
              icon={<CalendarDays size={20} />}
              label="Created"
              value={
                blog.createdAt
                  ? new Date(blog.createdAt).toLocaleString("en-GB")
                  : "-"
              }
            />

            <InfoCard
              icon={<CalendarDays size={20} />}
              label="Updated"
              value={
                blog.updatedAt
                  ? new Date(blog.updatedAt).toLocaleString("en-GB")
                  : "-"
              }
            />

            <InfoCard
              icon={<ShieldCheck size={20} />}
              label="Status"
              value={blog.activeStatus ? "Active" : "Inactive"}
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

// InfoBox Component
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

export default ShowBlog;
