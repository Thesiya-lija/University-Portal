import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiUsers, FiLogOut } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { AiFillInsurance } from "react-icons/ai";
import { MdEmojiEvents } from "react-icons/md";
import { FaUserTie, FaAlignLeft } from "react-icons/fa6";

import { LiaComment } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";

const CommiteeSidebar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="w-64 h-screen bg-white border-r fixed">
      <div className="p-4 text-xl font-bold flex items-center space-x-2">
        <FiGrid className="text-gray-700" />
        <span>TeamElevate</span>
      </div>

      <nav className="p-2">


        <NavLink
          to="/committee-dashboard"
          end
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-md ${isActive ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center space-x-3 p-3 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">
          <MdEmojiEvents />
            <NavLink
                to="/committee-dashboard/event"
                className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Event
              </NavLink>
          </div>

          {isDropdownOpen && (
            <div className="ml-6">
                <NavLink
                to="/committee-dashboard/display-event"
                className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Display Event
              </NavLink>
              <NavLink
                to="/committee-dashboard/add-event"
                className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Add Event
              </NavLink>
              <NavLink
                to="/committee-dashboard/edit-event"
                className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Edit Event
              </NavLink>
              <NavLink
                to="/committee-dashboard/delete-event"
                className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Delete Event
              </NavLink>
            </div>
          )}
        </div>

             </nav>

      <div className="p-4">
        <button
          className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default CommiteeSidebar;
