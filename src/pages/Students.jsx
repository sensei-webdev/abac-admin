import React, { useState, useEffect, useRef } from "react";
import ShowUser from "../forms/ShowStudents";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import "./table.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const Students = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const modalRef = useRef(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/users`);
      setUsers(res.data.userData || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsViewOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="space-y-4">
      <nav className="bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between p-5 rounded-2xl shadow-lg">
        <span className="text-3xl font-semibold text-gray-900 tracking-tight">
          Users
        </span>
      </nav>

      <section className="flex mx-auto w-full max-h-[calc(100vh-230px)] custom-scroll overflow-y-auto rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-white/20">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white/40 backdrop-blur-xl z-20 border-b border-white/20">
            <tr className="text-gray-800 text-sm uppercase tracking-wide">
              <th className="w-12 px-3 py-4 text-left">Sl</th>
              <th className="w-28 px-4 py-4 text-left">Image</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 text-left">Courses Enrolled</th>
              <th className="px-4 py-4 text-left">Joined On</th>
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
                      <div className="h-4 w-32 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-16 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-20 bg-white/30 rounded"></div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-6 w-12 bg-white/30 rounded"></div>
                    </td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b border-white transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/30"
                    } hover:bg-white/60 backdrop-blur-sm`}
                  >
                    <td className="px-3 py-4">{index + 1}</td>

                    <td className="px-3 py-4">
                      <img src={user.image} alt={user.firstName} className="object-cover size-12 rounded-full " />
                    </td>

                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.gender}</td>
                    <td className="px-4 py-4">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-4 py-4 flex gap-4 items-center text-xl">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsViewOpen(true);
                        }}
                        className="text-green-500 hover:text-green-700 transition"
                        title="View"
                      >
                        <FaRegEye />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </section>

      {/* View Modal */}
      {isViewOpen && selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setIsViewOpen(false)
          }
        >
          <div ref={modalRef} className="w-full max-w-2xl">
            <ShowUser user={selectedUser} close={() => setIsViewOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Students;
