import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BlogForm from "../forms/BlogForm"; // Add / Edit form
import ShowBlog from "../forms/ShowBlog"; // View blog modal
import { FaPenToSquare, FaRegTrashCan, FaRegEye } from "react-icons/fa6";
import "./table.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalType, setModalType] = useState(null); // add | edit | view | delete
  const [selectedBlog, setSelectedBlog] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  const modalRef = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/blogapi/blogs`
      );
      setBlogs(res.data.blogData || []);
    } catch (err) {
      console.error("Fetch blogs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const openModal = (type, blog = null) => {
    setSelectedBlog(blog);
    setModalType(type);
  };

  const closeAllModals = () => {
    setModalType(null);
    setSelectedBlog(null);
  };

  // ESC close modal
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeAllModals();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleDelete = async () => {
    if (!selectedBlog) return;
    try {
      await axios.delete(`${BASE_URL}/blogapi/blog/${selectedBlog._id}`);

      toast.success("Blog deleted successfully!");
      closeAllModals();
      fetchBlogs();
    } catch (err) {
      toast.error("Failed to delete blog!");
      console.error("Delete error:", err);
    }
  };

  return (
    <main className="space-y-4">
      <nav className="bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between p-5 rounded-2xl shadow-lg">
        <span className="text-3xl font-semibold text-gray-900 tracking-tight">
          Blogs
        </span>
        <button
          onClick={() => openModal("add")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          Add Blog
        </button>
      </nav>

      {/* ---------------- MODALS ---------------- */}

      {(modalType === "add" || modalType === "edit") && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10"
          onMouseDown={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div ref={modalRef} className="w-full max-w-2xl">
            <BlogForm
              isUpdate={modalType === "edit"}
              blogData={selectedBlog}
              onClose={closeAllModals}
              onSaved={() => {
                fetchBlogs();
                closeAllModals();
              }}
            />
          </div>
        </div>
      )}

      {modalType === "view" && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10"
          onMouseDown={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div className="w-full max-w-2xl">
            <ShowBlog blog={selectedBlog} onClose={closeAllModals} />
          </div>
        </div>
      )}

      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Delete Blog?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedBlog?.title}</strong>? This cannot be undone.
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
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Category</th>
              <th className="px-4 py-4 text-left">Author</th>
              <th className="px-4 py-4 text-left">Date Created</th>
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
                      <div className="h-4 w-24 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-20 bg-white/30 rounded"></div>
                    </td>
                  </tr>
                ))
              : blogs.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className={`border-b border-white transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/30"
                    } hover:bg-white/60 backdrop-blur-sm`}
                  >
                    <td className="px-3 py-4">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td className="p-4 w-2/5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 line-clamp-1">
                          {blog.title}
                        </span>
                        <span className="text-sm text-gray-600 line-clamp-1">
                          {blog.shortDescription}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">{blog.category}</td>

                    <td className="px-4 py-4">{blog.author}</td>

                    <td className="px-4 py-4">
                      {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-4 py-4 flex gap-4 items-center text-xl">
                      <button
                        onClick={() => openModal("view", blog)}
                        className="text-green-500 hover:text-green-700 transition"
                        title="View"
                      >
                        <FaRegEye />
                      </button>

                      <button
                        onClick={() => openModal("edit", blog)}
                        className="text-blue-600 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <FaPenToSquare />
                      </button>

                      <button
                        onClick={() => openModal("delete", blog)}
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

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Blog;
