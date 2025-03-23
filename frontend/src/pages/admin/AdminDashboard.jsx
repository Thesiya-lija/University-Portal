import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminStats from '../../components/admin/AdminStats';
import { Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-grow p-6">

        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
