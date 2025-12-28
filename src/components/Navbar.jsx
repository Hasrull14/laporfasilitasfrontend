import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/reports/profile");
        console.log("PROFILE:", res.data);
        setUser(res.data);
      } catch (err) {
        console.log("PROFILE ERROR:", err.response?.status);
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      {/* KIRI */}
      <div className="nav-left">
        <h3 className="logo">LaporApp</h3>
        {user?.role === "admin" && (
          <>
            <Link to="/admin">Admin Dashboard</Link>
          </>
        )}
        {user?.role === "user" && (
          <>
            <Link to="/dashboard">Laporan Saya</Link>
            <Link to="/reports/create">Buat Laporan</Link>

          </>
        )}
      </div>

      {/* KANAN */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="username">👤 {user.name}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
}
