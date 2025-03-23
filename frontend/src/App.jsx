import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/"); // Redirect to Signin page if no token is found
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
