import React from "react";
import DashboardCard from "../student/DashboardCard.jsx";
import { FiGrid } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";


import { CiCalendarDate } from "react-icons/ci";
import { AiFillInsurance } from "react-icons/ai";
import { MdWorkOff } from "react-icons/md";
import { LiaComment } from "react-icons/lia";
import { TbLayoutGridRemove } from "react-icons/tb";
import { MdEmojiEvents } from "react-icons/md";
import { BiCalendarEdit } from "react-icons/bi";

const CommitteeStats = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1 className="text-4xl font-bold text-center mb-10">Committee Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <DashboardCard  value="Total Events" link="/committee-dashboard/display-event" icon={<MdEmojiEvents />} />
          <DashboardCard  value="Add Events" link="/committee-dashboard/add-event" icon={<HiOutlineViewGridAdd />} />
          <DashboardCard  value="Edit Events" link="/committee-dashboard/edit-event" icon={<BiCalendarEdit />} />
          <DashboardCard  value="Delete Events" link="/committee-dashboard/delete-event" icon={<TbLayoutGridRemove />} />
          </div>
      </div>
    </div>
  );
};

export default CommitteeStats;
