import React, { useState, useEffect, useRef } from "react";
import AddNews from "../forms/AddNews"; // <-- You must create
import ShowNews from "../forms/ShowNews"; // <-- You must create
import StatusToggle from "../components/StatusToggle";
import { FaPenToSquare, FaRegTrashCan, FaRegEye } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import "./table.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalType, setModalType] = useState(null); // "add" | "edit" | "view" | "delete"
  const [selectedNews, setSelectedNews] = useState(null);

  const modalRef = useRef(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/newsapi/news/all`);
      setNews(res.data.newsData || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openModal = (type, newsItem = null) => {
    setSelectedNews(newsItem);
    setModalType(type);
  };

  const closeAllModals = () => {
    setModalType(null);
    setSelectedNews(null);
  };

  // Close modal with ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeAllModals();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleDelete = async () => {
    if (!selectedNews) return;

    try {
      await axios.delete(`${BASE_URL}/newsapi/delete/news/${selectedNews._id}`);

      toast.success("News deleted successfully!");
      closeAllModals();
      fetchNews();
    } catch (err) {
      toast.error("Failed to delete news!");
      console.error("Delete error:", err);
    }
  };

  return (
    <main className="space-y-4">
      {/* Top Bar */}
      <nav className="bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between p-5 rounded-2xl shadow-lg">
        <span className="text-3xl font-semibold text-gray-900 tracking-tight">
          News
        </span>

        <button
          onClick={() => openModal("add")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          Add News
        </button>
      </nav>

      {/* ---------------- MODALS ---------------- */}

      {(modalType === "add" || modalType === "edit") && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10"
          onMouseDown={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div ref={modalRef} className="w-full max-w-2xl">
            <AddNews
              isUpdate={modalType === "edit"}
              newsData={selectedNews}
              onClose={closeAllModals}
              onSaved={() => {
                fetchNews();
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
            <ShowNews news={selectedNews} onClose={closeAllModals} />
          </div>
        </div>
      )}

      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Delete News?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedNews?.title}</strong>? This action cannot be
              undone.
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

      {/* ----------- TABLE SECTION ----------- */}
      <section className="flex mx-auto w-full max-h-[calc(100vh-230px)] custom-scroll overflow-y-auto rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-white/20">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white/40 backdrop-blur-xl z-20 border-b border-white/20">
            <tr className="text-gray-800 text-sm uppercase tracking-wide">
              <th className="w-12 px-3 py-4 text-left">Sl</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Image</th>
              <th className="px-4 py-4 text-left">Short Description</th>
              <th className="px-4 py-4 text-left">Published</th>
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
                      <div className="h-12 w-20 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-48 bg-white/30 rounded"></div>
                    </td>
                  </tr>
                ))
              : news.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`border-b border-white transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/30"
                    } hover:bg-white/60 backdrop-blur-sm`}
                  >
                    <td className="px-3 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-semibold line-clamp-1">
                      {item.title}
                    </td>

                    <td className="px-4 py-4">
                      <img
                        src={item.image}
                        className="w-20 h-14 object-cover rounded-md border border-white/30 shadow-sm"
                      />
                    </td>

                    <td className="px-4 py-4 text-gray-700 line-clamp-2">
                      {item.shortDescription}
                    </td>

                    <td className="px-4 py-4">
                      {new Date(item.datePublished).toLocaleDateString("en-GB")}
                    </td>

                    
                    <td className="px-4 py-4 flex gap-4 items-center text-xl">
                      <button
                        onClick={() => openModal("view", item)}
                        className="text-green-500 hover:text-green-700 transition"
                      >
                        <FaRegEye />
                      </button>

                      <button
                        onClick={() => openModal("edit", item)}
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        <FaPenToSquare />
                      </button>

                      <button
                        onClick={() => openModal("delete", item)}
                        className="text-red-600 hover:text-red-700 transition"
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

export default News;
