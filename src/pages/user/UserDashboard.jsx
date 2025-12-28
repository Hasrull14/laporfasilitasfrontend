import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./userDashboard.css";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data sekali saat mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports/my");
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h2>Laporan Saya</h2>
      <Link to={`/reports/create`}>
        <button className="btn-add">+ Tambah Laporan</button>
      </Link>
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
                      <Link to={`/myreport/${r._id}`}>
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
