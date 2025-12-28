import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./adminDashboard.css";


export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data sekali saat mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await api.put(`/reports/status/${id}`, { status });

    setReports((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

  const deleteReport = async (id) => {
    if (!confirm("Yakin ingin menghapus laporan ini?")) return;

    await api.delete(`/reports/${id}`);
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="admin-container">
      <h2>Dashboard Admin</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Lokasi</th>
                <th>Deskripsi</th>
                <th>Pelapor</th>
                <th>Email</th>
                <th>Status</th>
                <th>Update</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="10" align="center">
                    Tidak ada laporan
                  </td>
                </tr>
              ) : (
                reports.map((r, i) => (
                  <tr key={r._id}>
                    <td>{i + 1}</td>
                    <td>{r.title.substring(0, 15)}...</td>
                    <td>{r.category}</td>
                    <td>{r.location.substring(0, 15)}...</td>
                    <td>{r.description.substring(0, 20)}...</td>
                    <td>{r.user?.name}</td>
                    <td>{r.user?.email}</td>
                    <td>
                      <span className={`status ${r.status}`}>{r.status}</span>
                    </td>
                    <td>
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r._id, e.target.value)}
                      >
                        <option value="baru">Baru</option>
                        <option value="diproses">Diproses</option>
                        <option value="selesai">Selesai</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteReport(r._id)}
                      >
                        Delete
                      </button>

                      <Link to={`/report/${r._id}`}>
                        <button className="btn-detail">Detail</button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
