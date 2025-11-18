// src/components/forms/BlogForm.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const BlogForm = ({ onClose, isUpdate = false, blogData = null, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    shortDescription: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    readingTime: "",
    activeStatus: true,
  });

  // Prefill form when updating
  useEffect(() => {
    if (isUpdate && blogData) {
      setForm({
        title: blogData.title || "",
        image: blogData.image || "",
        shortDescription: blogData.shortDescription || "",
        content: blogData.content || "",
        author: blogData.author || "",
        category: blogData.category || "",
        tags: blogData.tags?.join(", ") || "",
        readingTime: blogData.readingTime || "",
        activeStatus: blogData.activeStatus ?? true,
      });
    }
  }, [isUpdate, blogData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading(
      isUpdate ? "Updating blog..." : "Saving blog..."
    );

    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      };

      if (isUpdate && blogData?._id) {
        await axios.put(
          `${BASE_URL}/blogapi/update/blog/${blogData._id}`,
          payload
        );
        toast.success("Blog updated successfully", { id: loading });
      } else {
        await axios.post(`${BASE_URL}/blogapi/blog`, payload);
        toast.success("Blog created successfully", { id: loading });
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10 space-y-6">
      <h2 className="text-xl font-semibold">
        {isUpdate ? "Update Blog" : "Add Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded-2xl">
          {form.image ? (
            <img
              src={form.image}
              alt={form.title}
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

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL *</label>
          <input
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="https://example.com/blog.jpg"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Blog Title *</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="How AI is Changing the World"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-medium">Short Description *</label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="2"
            placeholder="Brief summary about the blog..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="6"
            placeholder="Write full blog content here..."
          />
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium">Author *</label>
          <input
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="John Doe"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select category...</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="design">Design</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="AI, Future, Tech"
          />
        </div>

        {/* Reading Time */}
        <div>
          <label className="block mb-1 font-medium">
            Reading Time (minutes)
          </label>
          <input
            name="readingTime"
            type="number"
            value={form.readingTime}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="5"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            {isUpdate ? "Update Blog" : "Publish Blog"}
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

export default BlogForm;
