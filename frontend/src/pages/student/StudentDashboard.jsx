import React from 'react';
import StudentSidebar from '../../components/student/StudentSidebar.jsx'
import { Outlet } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-grow p-6">
       
        <Outlet /> 
      </div>
    </div>
  );
}

export default StudentDashboard;