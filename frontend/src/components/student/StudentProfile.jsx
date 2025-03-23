import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FrmInput from "../FormInput.jsx"; // Import FrmInput
import { toast } from "react-hot-toast";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null); // For participation history upload

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (!decoded.studentId) {
        throw new Error("Invalid token: Missing studentId.");
      }

      const id = decoded.studentId;
      setStudentId(id);

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/student/fetch-student/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setStudent(res.data);
          setInterests(res.data.interests || []);
        })
        .catch((err) => {
          toast.error("Failed to fetch student details.");
          console.error("Fetch error:", err.response ? err.response.data : err);
        });

    } catch (error) {
      toast.error("Authentication error. Please log in again.");
      console.error("Auth error:", error);
      localStorage.removeItem("token");
    }
  }, []);

  // Add interest function
  const addInterest = () => {
    if (!newInterest.trim()) {
      toast.error("Interest cannot be empty.");
      return;
    }

    // Ensure no duplicate interests
    if (interests.includes(newInterest.trim())) {
      toast.error("Interest already exists.");
      return;
    }

    setInterests([...interests, newInterest.trim()]);
    setNewInterest("");
  };

  // Save Profile Function (Interests & File Upload)
  const saveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found.");
      return;
    }

    const formData = new FormData();
    formData.append("interests", JSON.stringify(interests));

    if (file) {
      formData.append("participationHistory", file);
    }

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/student/student-profile/${studentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (!student) return <p>Loading student details...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 shadow-lg bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Student Profile</h2>
      <form onSubmit={saveProfile}>
        <div className="mb-4">
          <FrmInput label="Name" name="name" defaultValue={student.name} readOnly />
        </div>

        <div className="mb-4">
          <FrmInput label="Email" name="email" defaultValue={student.email} readOnly />
        </div>

        <div className="mb-4">
          <FrmInput label="Student ID" name="studentId" defaultValue={student.studentId} readOnly />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Interests</label>
          <div className="p-2 border rounded bg-gray-100">
            {interests.length > 0 ? interests.join(", ") : "No interests added yet."}
          </div>
        </div>

        {/* Interest Input */}
        <div className="mb-4">
          <FrmInput
            label="Add New Interest"
            name="interest"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Enter interest"
          />
          <button
            type="button"
            onClick={addInterest}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        

        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          type="submit"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
