import React from "react";
import { FaUserTie } from "react-icons/fa6";
import DashboardCard from "../student/DashboardCard.jsx";
import { MdEmojiEvents } from "react-icons/md";
import { PiUserCircleCheckLight } from "react-icons/pi";

const AdminStats = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard value="Student Enrollment" link="/admin-dashboard/student-enrollment" icon={<FaUserTie />} />
        <DashboardCard value="Events" link="/admin-dashboard/events" icon={<MdEmojiEvents />} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
