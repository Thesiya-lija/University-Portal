import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication failed. Please log in again.");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/committee/get-all-event`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("An error occurred while fetching events.");
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    setLoading(true);

    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication failed. Please log in again.");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/committee/get-eventbyid/${selectedEventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch event details");
        const eventData = await response.json();

        const event = eventData.event || eventData;
        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date ? event.date.split("T")[0] : "",
          time: event.time || "",
          venue: event.venue || "",
          category: event.category || "",
          participantLimit: event.participantLimit?.toString() || "",
          rules: event.rules ? event.rules.join("\n") : "",
          registrationFee: event.registrationFee?.toString() || "",
        });
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast.error("An error occurred while fetching event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [selectedEventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId) {
      toast.error("Please select an event.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        return;
      }

      const updatedData = {
        ...formData,
        participantLimit: Number(formData.participantLimit),
        registrationFee: Number(formData.registrationFee),
        date: new Date(formData.date).toISOString().split("T")[0],
        rules: formData.rules.split("\n").map((rule) => rule.trim()),
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/committee/edit-event/${selectedEventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Event updated successfully!");
        navigate("/committee-dashboard");
      } else {
        toast.error(data.message || "Failed to update event.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the event.");
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100 mt-10">
      <div className="ml-64 flex-grow p-6">
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
          <label className="block font-medium text-gray-700">Select Event</label>
          <select
            className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300"
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
          >
            <option value="">-- Select an Event --</option>
            {events.length > 0 ? (
              events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event._id} - {event.category} - {event.title}
                </option>
              ))
            ) : (
              <option disabled>No events available</option>
            )}
          </select>
          {loading && <p className="text-center mt-4">Loading event details...</p>}
          {!loading && formData && (
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <FormInput label="Title" name="title" value={formData.title} onChange={handleChange} />
              <FormInput label="Description" name="description" value={formData.description} onChange={handleChange} />
              <FormInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
              <FormInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange} />
              <FormInput label="Venue" name="venue" value={formData.venue} onChange={handleChange} />
              <FormInput label="Participant Limit" name="participantLimit" type="number" value={formData.participantLimit} onChange={handleChange} />
              <FormInput label="Registration Fee" name="registrationFee" type="number" value={formData.registrationFee} onChange={handleChange} />
              <button type="submit" className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Update Event</button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </main>
  );
};

export default EditEvent;