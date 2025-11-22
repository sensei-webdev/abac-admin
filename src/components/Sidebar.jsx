import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    isActive
      ? "py-2 pl-4 flex gap-3 items-center rounded-lg w-full text-base font-medium text-black bg-white/20 backdrop-blur-sm shadow-sm transition-all duration-300"
      : "py-2 pl-4 flex gap-3 items-center rounded-lg w-full text-base font-medium text-black/70 hover:text-black hover:bg-white/60 transition-all duration-300";

  const asideLinks = [
    { name: "Dashboard", Icon: MdOutlineSpaceDashboard, link: "/dashboard" },
    { name: "Courses", Icon: IoBookOutline, link: "/courses" },
    { name: "News", Icon: LuNewspaper, link: "/news" },
    { name: "Blog", Icon: FaRegPenToSquare, link: "/blog" },
    { name: "Students", Icon: PiStudentBold, link: "/students" },
  ];

  return (
    <aside className="text-black min-h-screen w-full bg-white/10 backdrop-blur-xl border-r border-white/20 px-4 py-6 flex flex-col shadow-xl">
      <Link
        to="/"
        className="inline-flex items-center text-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-2xl font-bold shadow-sm text-blue-900 tracking-tight mb-4"
      >
        AB<span className="text-amber-400">AC</span>
      </Link>

      <h3 className="pb-3 mb-6 text-sm text-black/70 font-medium border-b-2 border-black/30">
        Abu Bakar Academy of Coding
      </h3>

      <nav className="flex flex-col">
        <span className="text-xs mb-3 uppercase tracking-wide text-black/50">
          Navigation
        </span>

        {asideLinks.map((item, index) => (
          <NavLink key={index} to={item.link} className={linkClasses}>
            <item.Icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
