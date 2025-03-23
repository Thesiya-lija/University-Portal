import React from "react";
import DashboardCard from "./DashboardCard.jsx";
import { FaUsers, FaUserPlus } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { AiFillInsurance } from "react-icons/ai";
import { MdWorkOff } from "react-icons/md";
import { LiaComment } from "react-icons/lia";

const StudentStats = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1 className="text-4xl font-bold text-center mb-10">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Total Events" value="Events" link="/student-dashboard/display-event" icon={<FaUsers />} />
          <DashboardCard title="Student Profile" value="Manage Profile" link="/student-dashboard/student-profile" icon={<CgProfile />
} />
        </div>
      </div>
    </div>
  );
};

export default StudentStats;
