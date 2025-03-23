import { useState } from "react";
import FormInput from "../FormInput.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    participantLimit: "",
    rules: "",
    registrationFee: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
      case "venue":
      case "category":
        if (!value.trim()) error = "This field is required";
        break;
      case "description":
        if (value.length < 10)
          error = "Description must be at least 10 characters long";
        break;
      case "date":
        const eventDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (eventDate < today) error = "Date cannot be in the past";
        break;
      case "time":
        if (!/^([01]?\d|2[0-3]):[0-5]\d$/.test(value))
          error = "Invalid time format (HH:MM)";
        break;
      case "participantLimit":
      case "registrationFee":
        if (isNaN(value) || value < 0) error = "Enter a valid positive number";
        break;
      default:
        break;
    }

    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        return;
      }

      const eventData = {
        ...formData,
        participantLimit: Number(formData.participantLimit),
        registrationFee: Number(formData.registrationFee),
        date: new Date(formData.date).toISOString().split("T")[0],
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/committee/add-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Event added successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          venue: "",
          category: "",
          participantLimit: "",
          rules: "",
          registrationFee: "",
        });
        setErrors({});
      } else {
        toast.error(data.message || "Failed to add event");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred while adding the event");
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100 mt-10">
      <div className="ml-64 flex-grow p-6">
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput label="Title" name="title" value={formData.title} onChange={handleChange} error={errors.title} />
            <FormInput label="Description" name="description" value={formData.description} onChange={handleChange} error={errors.description} />
            <FormInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} error={errors.date} />
            <FormInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange} error={errors.time} />
            <FormInput label="Venue" name="venue" value={formData.venue} onChange={handleChange} error={errors.venue} />
            <FormInput label="Category" name="category" type="select" value={formData.category} onChange={handleChange} error={errors.category} />
            <label className="block font-medium text-gray-700">Rules</label>
            <textarea name="rules" value={formData.rules} onChange={handleChange} className="border border-green-500 p-2 w-full h-32 rounded-md shadow-sm" />
            <FormInput label="Participant Limit" name="participantLimit" type="number" value={formData.participantLimit} onChange={handleChange} error={errors.participantLimit} />
            <FormInput label="Registration Fee" name="registrationFee" type="number" value={formData.registrationFee} onChange={handleChange} error={errors.registrationFee} />
            <button type="submit" className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Add Event
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </main>
  );
};

export default AddEvent;