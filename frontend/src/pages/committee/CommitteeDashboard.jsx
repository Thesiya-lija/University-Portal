import React from 'react';
import { Outlet } from 'react-router-dom';
 import CommmitteeSidebar from '../../components/committee/CommitteeSidebar.jsx'

function CommitteeDashbaord() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <CommmitteeSidebar />
      <div className="flex-grow p-6">
       
        <Outlet /> 
      </div>
    </div>
  );
}

export default CommitteeDashbaord;