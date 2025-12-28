import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./createReport.css";

export default function CreateReport() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    api.get("/reports/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/reports", data);
    navigate("/dashboard");
  };

  return (
    <div className="report-container">
      <form className="report-card" onSubmit={submit}>
        <h2>Buat Laporan</h2>

        <div className="form-group">
          <label>Judul Laporan</label>
          <input
            required
            placeholder="Contoh: Jalan Rusak"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select
            required
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="" aria-disabled>
              -- Pilih Kategori --
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Lokasi</label>
          <input
            required
            placeholder="Contoh: Jalan Sudirman"
            onChange={(e) => setData({ ...data, location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            required
            rows="4"
            placeholder="Jelaskan masalah secara detail..."
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <button className="submit-btn">Kirim Laporan</button>
      </form>
    </div>
  );
}
