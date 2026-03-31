import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Tickets() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  // const [agents, setAgents] = useState([]); // agents are not ready for now
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
    fetchTickets();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("accounts/profile/");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await API.get("tickets/");
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTicket = async () => {
    try {
      await API.post("tickets/", form);
      setForm({
        title: "",
        description: "",
        priority: "low",
      });
      fetchTickets();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleAdminUpdate = async (ticketId, updatedData) => {
    try {
      await API.patch(`tickets/${ticketId}/admin-update/`, updatedData);
      fetchTickets();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px" }}>
      <h2>Complaint / Tickets</h2>

      {user?.role === "user" && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "25px",
          }}
        >
          <h3>Create Complaint</h3>

          <input
            type="text"
            placeholder="Ticket title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <textarea
            placeholder="Describe your complaint"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minHeight: "100px",
            }}
          />

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={handleCreateTicket}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Create Ticket
          </button>
        </div>
      )}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          width: "1000px",
        }}
      >
        <h3>{user?.role === "admin" ? "All Complaints" : "My Complaints"}</h3>

        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                background: "#f9fafb",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>{ticket.title}</h4>
              <p style={{ margin: "0 0 8px 0" }}>{ticket.description}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Created By:</strong> {ticket.user_username}</p>
              <p><strong>Assigned To:</strong> {ticket.assigned_to_username || "Not assigned"}</p>

              {user?.role === "admin" && (
                <AdminTicketControls
                  ticket={ticket}
                  onUpdate={handleAdminUpdate}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AdminTicketControls({ ticket, onUpdate }) {
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [assignedTo, setAssignedTo] = useState(ticket.assigned_to || "");

  return (
    <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
      <h5>Admin Controls</h5>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="number"
        placeholder="Assign user ID"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        style={{ marginRight: "10px", padding: "8px", width: "140px" }}
      />

      <button
        onClick={() =>
          onUpdate(ticket.id, {
            status,
            priority,
            assigned_to: assignedTo || null,
          })
        }
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Update
      </button>
    </div>
  );
}

export default Tickets;