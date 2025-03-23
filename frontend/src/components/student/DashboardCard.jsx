import React from "react";
import { NavLink } from "react-router-dom";


const DashboardCard = ({ title, value, link, icon }) => {
    return (
        <NavLink
            to={link}
            className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-white hover:shadow-xl transition-transform transform hover:-translate-y-1 border border-gray-200"
        >
            <div className="text-blue-600 text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </NavLink>
    );
};

export default DashboardCard;
