  import React from 'react';
  import { NavLink, useNavigate } from 'react-router-dom';
  import { FiGrid, FiUsers, FiLogOut, FiTrendingUp } from 'react-icons/fi';
  import { FaUserTie, FaAlignLeft } from "react-icons/fa6";
  import { CiCalendarDate } from "react-icons/ci";
  import { MdEmojiEvents } from "react-icons/md";
  import { MdWorkOff } from "react-icons/md";
  import { CgProfile } from "react-icons/cg";

  import { LiaComment } from "react-icons/lia";
  import { RiLockPasswordLine } from "react-icons/ri";

  const StudentSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate("/logout");
    };

    return (
      <div className="w-64 h-screen bg-white border-r fixed mt-0">
        <div className="flex flex-col h-full">
          <div className="">
            <FiGrid className="text-2xl text-gray-700" />
            <span className="text-2xl font-semibold text-gray-800">TeamElevate</span>
          </div>

          <nav className="flex-1 px-4 mt-4">
            <NavLink
              to="/student-dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md ${isActive ? 'bg-gray-200 text-black' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FiGrid />
              <span>Dashboard</span>
            </NavLink>

            
            <NavLink
              to="/student-dashboard/display-event"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md ${isActive ? 'bg-gray-200 text-black' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <MdEmojiEvents />
              <span>Apply Event</span>
            </NavLink>

            
            <NavLink
              to="/student-dashboard/student-profile"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md ${isActive ? 'bg-gray-200 text-black' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <CgProfile />

              <span>Student Profile</span>
            </NavLink>
          </nav>

          <div className="px-4 py-6">
            <button
              className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-md hover:bg-blue -600"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default StudentSidebar;