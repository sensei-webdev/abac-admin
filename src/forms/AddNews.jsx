import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const NewsForm = ({ existing, close, refresh }) => {
  const [form, setForm] = useState({
    title: existing?.title || "",
    image: existing?.image || "",
    shortDescription: existing?.shortDescription || "",
    content: existing?.content || "",
    datePublished: existing?.datePublished
      ? existing.datePublished.slice(0, 10)
      : "",
    sourceLink: existing?.sourceLink || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existing) {
        // UPDATE
        await axios.put(
          `${BASE_URL}/newsapi/update/news/${existing._id}`,
          form
        );
      } else {
        // CREATE
        await axios.post(`${BASE_URL}/newsapi/news`, form);
      }

      refresh();
      close();
    } catch (error) {
      console.log("Error saving news:", error);
    }
  };

  return (
    <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {existing ? "Edit News" : "Add News"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />

        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />

        <textarea
          name="content"
          placeholder="Full Content"
          value={form.content}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          rows="4"
          required
        />

        <input
          type="date"
          name="datePublished"
          value={form.datePublished}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="sourceLink"
          placeholder="Source Link"
          value={form.sourceLink}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {existing ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
