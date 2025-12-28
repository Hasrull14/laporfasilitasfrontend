import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./userDetailReport.css";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/my/${id}`);
        setReport(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!report) return <p className="not-found">Report tidak ditemukan</p>;

  return (
    <div className="report-detail-container">
      <Link to="/dashboard" className="back-link">
        ← Kembali
      </Link>

      <div className="report-card">
        <h2>{report.title}</h2>

        <div className="meta">
          <span className="badge">{report.category}</span>
          <span className={`status ${report.status}`}>
            {report.status}
          </span>
        </div>

        <p className="location">
          📍 {report.location}
        </p>

        <hr />

        <p className="description"> {report.description}</p>

        <hr />

        <div className="reporter">
          <p><b>Pelapor:</b> {report.user?.name}</p>
          <p><b>Email:</b> {report.user?.email}</p>
        </div>
      </div>
    </div>
  );
}
