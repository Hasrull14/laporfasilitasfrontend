import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 👈 ini pengganti window.location

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", register);
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Registrasi gagal";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={submit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        <input
          required
          placeholder="Name"
          onChange={(e) => setRegister({ ...register, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />
        <input
          required
          placeholder="Password"
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
        />

        <select
          required
          onChange={(e) => setRegister({ ...register, role: e.target.value })}
        >
          <option aria-readonly>Pilih Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button disabled={loading}>
          {loading ? "Register in..." : "Register"}
        </button>
        <p className="text-center">
          Already Have Account <Link to={"/"}>Login</Link>
        </p>
      </form>
    </div>
  );
}
