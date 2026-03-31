import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [ticketTrends, setTicketTrends] = useState(null);
  const [resolutionData, setResolutionData] = useState(null);

  useEffect(() => {
    checkAccessAndFetch();
  }, []);

  const checkAccessAndFetch = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const profileRes = await API.get("accounts/profile/");
      setUser(profileRes.data);

      if (profileRes.data.role !== "admin") {
        navigate("/profile");
        return;
      }

      await fetchAnalytics();
    } catch (err) {
      console.error(err.response?.data || err.message);
      navigate("/login");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const trendsRes = await API.get("analytics/ticket-trends/");
      const resolutionRes = await API.get("analytics/resolution-time/");

      setTicketTrends(trendsRes.data);
      setResolutionData(resolutionRes.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const chartData = ticketTrends
    ? [
        { status: "Open", count: ticketTrends.open },
        { status: "In Progress", count: ticketTrends.in_progress },
        { status: "Resolved", count: ticketTrends.resolved },
        { status: "Closed", count: ticketTrends.closed },
      ]
    : [];

  return (
    <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Admin Analytics Dashboard</h2>

      {!ticketTrends || !resolutionData ? (
        <p>Loading analytics...</p>
      ) : (
        <>
          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "25px",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Ticket Trends</h3>

            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width:"1000px"
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Resolution Time Analysis</h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  Resolved Tickets
                </p>
                <h3 style={{ marginTop: "8px" }}>{resolutionData.resolved_ticket_count}</h3>
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  Avg Days
                </p>
                <h3 style={{ marginTop: "8px" }}>{resolutionData.days}</h3>
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  Avg Hours
                </p>
                <h3 style={{ marginTop: "8px" }}>{resolutionData.hours}</h3>
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  Avg Minutes
                </p>
                <h3 style={{ marginTop: "8px" }}>{resolutionData.minutes}</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;