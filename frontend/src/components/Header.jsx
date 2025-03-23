import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl text-blue-800 font-bold sm:text-2xl">
              University Portal
            </span>
          </div>

          
        </div>
      </div>
    </nav>
  );
};

export default Header;
