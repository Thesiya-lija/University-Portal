import React, { useState, useEffect } from "react";

const DisplayEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication failed. Please log in again.");
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/get-all-event`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        if (!data.events || !Array.isArray(data.events)) {
          throw new Error("Invalid response format: Events not found");
        }

        setEvents(data.events);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-100 mt-10">
      <div className="ml-64 flex-grow p-6">
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">All Events</h2>
          {loading ? (
            <p className="text-center">Loading events...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : events.length > 0 ? (
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event._id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-gray-500">{new Date(event.time).toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Category: {event.category}</p>
                  <p className="text-gray-400 text-sm">Venue: {event.venue}</p>
                  <p className="text-gray-400 text-sm">Participants: {event.participantLimit}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No events available.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default DisplayEvent;