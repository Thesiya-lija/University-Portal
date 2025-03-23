import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [appliedEvents, setAppliedEvents] = useState(new Set()); // Track applied events locally

  // Decode token and fetch student ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setStudentId(decoded.studentId);
      } catch (err) {
        console.error("Error decoding token:", err);
        setError("Invalid authentication token.");
      }
    } else {
      setError("No authentication token found. Please log in.");
    }
  }, []);

  // Fetch events when studentId is available
  useEffect(() => {
    if (!studentId) return;

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/student/event-details/${studentId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          setError(response.data.message || "Failed to load events.");
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [studentId]);

  // Handler for applying to an event
  const applyToEvent = async (eventId) => {
    if (!studentId) return;

    try {
      const response = await axios.post(
        `${API_URL}/student/apply-event/${studentId}/${eventId}`,
        {}, // Empty body if not needed
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.data.success) {
        toast.success("Successfully applied for the event!");
        
        // Update UI immediately
        setAppliedEvents((prev) => new Set(prev).add(eventId));
      } else {
        toast.error(response.data.message || "Failed to apply.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error applying to event');
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="flex mt-10 bg-gray-100 pl-[250px]">
      <div className="flex-grow p-6">
        <div className="p-4 mx-auto bg-white border rounded shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Available Events</h2>
          {events.length > 0 ? (
            <table className="w-full border border-collapse border-gray-300">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Venue</th>
                  <th className="p-3 text-center border">Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border hover:bg-gray-100">
                    <td className="p-3 border">{event.title}</td>
                    <td className="p-3 border">{event.category}</td>
                    <td className="p-3 border">
                      {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-3 border">{event.venue}</td>
                    <td className="p-3 text-center border">
                      <button
                        onClick={() => applyToEvent(event._id)}
                        disabled={appliedEvents.has(event._id)}
                        className={`px-4 py-2 text-white rounded ${
                          appliedEvents.has(event._id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {appliedEvents.has(event._id) ? "Applied" : "Apply"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No events available.</p>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </main>
  );
};

export default EventList;
