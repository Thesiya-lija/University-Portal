import React, { useState } from "react";
import FormInput from "../../components/FormInput.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "studentId":
        if (!value.trim()) error = "Student ID is required.";
        break;
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) error = "Name must contain only letters.";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format.";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters.";
        else if (!/[A-Z]/.test(value)) error = "Password must include at least one uppercase letter.";
        else if (!/[0-9]/.test(value)) error = "Password must include at least one number.";
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/student-signup`,
        formData, // Sending only studentID, name, email, password
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Student registered successfully!");
        setFormData({
          studentID: "",
          name: "",
          email: "",
          password: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error(error.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="pl-[260px]">
      <div className="p-5 mt-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
          <div className="w-full p-10 mt-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
              Student Signup
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student ID & Name in One Row */}
              <div className="grid grid-cols-2 gap-5">
                <FormInput
                  label="Student ID"
                  name="studentId"
                  onChange={handleInputChange}
                  error={errors.studentId}
                  value={formData.studentId}
                />
                <FormInput
                  label="Name"
                  name="name"
                  onChange={handleInputChange}
                  error={errors.name}
                  value={formData.name}
                />
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-2 gap-5">
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  error={errors.email}
                  value={formData.email}
                />
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  error={errors.password}
                  value={formData.password}
                />
              </div>

            

              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default StudentSignup;
