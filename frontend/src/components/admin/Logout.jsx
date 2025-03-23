import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
  
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  }, [navigate]);

  return <h1 className="text-center mt-10">Logging out...</h1>;
};

export default Logout;
