import { experience } from "@/lib/data";

export default function ExperienceWindow() {
  return (
    <div style={{ padding: 16, fontFamily: "Tahoma, sans-serif" }}>
      <div style={{ marginBottom: 10, fontSize: 11, color: "#555" }}>
        11 years of professional experience in security engineering.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {experience.map((job, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: "1px solid #c0bdb0",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* Job header */}
            <div
              style={{
                background: "linear-gradient(180deg, #dfe8f5 0%, #c8d8ee 100%)",
                borderBottom: "1px solid #a8bcd0",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>💼</span>
              <div>
                <div style={{ fontWeight: "bold", fontSize: 12, color: "#003399" }}>
                  {job.title}
                </div>
                <div style={{ fontSize: 11, color: "#555" }}>{job.company}</div>
              </div>
            </div>
            {/* Job body */}
            <div style={{ padding: "8px 10px", fontSize: 11, color: "#333", lineHeight: 1.5 }}>
              {job.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
