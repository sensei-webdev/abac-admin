import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CalendarDays, ShieldCheck, Users } from "lucide-react";

const ShowStudents = ({ user, close }) => {
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-900 text-white p-5">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Users Details
          </h2>

          <button
            onClick={close}
            className="text-white/80 hover:text-red-400 transition text-3xl ml-3"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 size-24">
              <img
                src={user.image}
                alt={user.firstName}
                className="rounded-full"
              />
            </div>
            <InfoCard
              icon={<Users size={20} />}
              label="Name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <InfoCard
              icon={<ShieldCheck size={20} />}
              label="Email"
              value={user.email}
            />
            <InfoCard
              icon={<ShieldCheck size={20} />}
              label="Courses"
              value={user.courses}
            />
            {/* <InfoCard
              icon={<ShieldCheck size={20} />}
              label="Clerk ID"
              value={user.clerkId || "-"}
            /> */}
            <InfoCard
              icon={<CalendarDays size={20} />}
              label="Created At"
              value={new Date(user.createdAt).toLocaleString()}
            />
            {/* <InfoCard
              icon={<CalendarDays size={20} />}
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleString()}
            /> */}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end">
          <button
            onClick={close}
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

export default ShowStudents;
