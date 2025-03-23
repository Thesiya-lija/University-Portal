import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signin from "../pages/admin/Signin.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import StudentSignUp from "../pages/admin/StudentSignup.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx"; // Ensure this is correctly implemented
import CommitteeDashbaord from "../pages/committee/CommitteeDashboard.jsx";
import StudentDashboard from "../pages/student/StudentDashboard.jsx";
import StudentProfile from "../components/student/StudentProfile.jsx";
import EventList from '../components/student/EventList.jsx'
import StudentStats from "../components/student/StudentStats.jsx";
import AddEvent from "../components/committee/AddEvent.jsx";
import DeleteEvent from "../components/committee/DeletEvent.jsx";
import CommitteeStats from "../components/committee/CommitteeStats.jsx";
import AdminStats from "../components/admin/AdminStats.jsx";
import EditEvent from "../components/committee/EditEvent.jsx";
import EventEnrollment from "../components/admin/EventEnrollment.jsx";
import FetchEvent from "../components/committee/FetchEvent.jsx";
import DisplayEvent from '../components/admin/DisplayEvent.jsx'
import  Logout from '../components/admin/Logout.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Ensures Signin is the default child for "/"
        element: <Signin />,
      },
      {
        path: "admin-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminStats /> },
          { path: "student-enrollment", element: <StudentSignUp /> },
          { path: "events", element: <DisplayEvent /> },
          { path: "event-enrollment", element: <EventEnrollment /> },

          // { path: "student-enrollment", element: <StudentSignUp /> },

        ],
      },


      {
        path: "committee-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["committee"]}>
            <CommitteeDashbaord />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <CommitteeStats /> },

          { path: "event", element: <FetchEvent /> },
          { path: "display-event", element: <FetchEvent/> },

          { path: "add-event", element: <AddEvent/> },
          { path: "edit-event", element: <EditEvent /> },
          { path: "delete-event", element: <DeleteEvent /> },
        ],
      },

      {
        path: "student-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <StudentStats /> },
          { path: "student-profile", element: <StudentProfile /> },
          { path: "display-event", element: <EventList /> },
          
        ],
      },
      {
        path: "logout", element: <Logout />
      }
    ],
  },
]);

export default router;
