import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Header from "./components/Header";
import Students from "./pages/Students";
import Login from "./pages/Login";
import "./App.css";

const App = () => {
  return (
    <section
      className="text-white min-h-full grid grid-cols-5"
      style={{
        background: `
        radial-gradient(ellipse 80% 60% at 70% 20%, rgba(175, 109, 255, 0.85), transparent 68%),
        radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.75), transparent 68%),
        radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.98), transparent 68%),
        radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.3), transparent 68%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
      }}
    >
      <aside className="px-3 col-span-1">
        <Sidebar />
      </aside>
      {/* bg-gray-300 */}
      <main className="col-span-4 space-y-4 py-4 text-black">
        <Header />
        <Toaster position="bottom-right" />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/news" element={<News />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </main>
    </section>
  );
};

export default App;
