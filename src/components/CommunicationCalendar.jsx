import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CommunicationCalendar = ({ communications = [] }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Calendar */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Calendar
          onChange={handleDateChange}
          value={date}
          next2Label={null}
          prev2Label={null}
          tileClassName="calendar-tile"
        />
      </div>

      {/* Communication Info */}
      <div>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "600",
            textDecoration: "underline",
            color: "#00796b",
            marginTop: "20px",
          }}
        >
          Communications on {date.toLocaleDateString()}
        </h3>
        {communications.length > 0 ? (
          communications
            .filter((comm) => {
              const commDate = new Date(comm.date);
              return commDate.toDateString() === date.toDateString();
            })
            .map((comm, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#555",
                  }}
                >
                  {idx + 1}.{" "}
                  <span style={{ fontWeight: "bold", color: "#00796b" }}>
                    {comm.type?.name || "Unknown Type"}
                  </span>{" "}
                  -{" "}
                  <span style={{ fontStyle: "italic", color: "#00796b" }}>
                    {comm.company?.name || "Unknown Company"}
                  </span>{" "}
                  -{" "}
                  <span style={{ fontStyle: "italic", color: "#999" }}>
                    {comm.notes || "No notes"}
                  </span>
                </p>
              </div>
            ))
        ) : (
          <p style={{ fontSize: "16px", color: "#999" }}>
            No communications available for the selected date.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommunicationCalendar;
