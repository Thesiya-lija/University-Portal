import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication failed. Please log in again.");
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/committee/get-all-event`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.events || !Array.isArray(data.events)) {
          throw new Error("Invalid response format: Events not found");
        }

        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/committee/delete-event/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100 mt-10">
      <div className="ml-64 flex-grow p-6">
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Manage Events</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading events...</p>
          ) : events.length > 0 ? (
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event._id} className="flex justify-between items-center bg-white p-5 shadow-lg rounded-lg border border-gray-200">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{event.title}</p>
                    <p className="text-gray-600">Date & Time: {new Date(event.time).toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Event ID: {event._id}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No events available.</p>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </main>
  );
};

export default DeleteEvent;