import { profile, education } from "@/lib/data";

export default function AboutWindow() {
  return (
    <div style={{ padding: 16, fontFamily: "Tahoma, sans-serif" }}>
      {/* XP-style info panel */}
      <div
        style={{
          background: "linear-gradient(180deg, #dfe8f5 0%, #c8d8ee 100%)",
          border: "1px solid #7a9ec8",
          borderRadius: 4,
          padding: "12px 16px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4b9cf5, #0058ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}
        >
          👤
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#003399" }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>
            {profile.title}
          </div>
        </div>
      </div>

      <Section title="About">
        <p style={{ margin: 0, lineHeight: 1.6, color: "#333" }}>{profile.summary}</p>
      </Section>

      <Section title="Education">
        <InfoRow label="Degree" value={education.degree} />
        <InfoRow label="Minor" value={education.minor} />
        <InfoRow label="School" value={education.school} />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          background: "linear-gradient(180deg, #4b9cf5 0%, #0058ee 100%)",
          color: "white",
          fontSize: 11,
          fontWeight: "bold",
          padding: "2px 8px",
          marginBottom: 6,
          borderRadius: 2,
        }}
      >
        {title}
      </div>
      <div style={{ paddingLeft: 4 }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 3, fontSize: 11 }}>
      <span style={{ color: "#555", width: 60, flexShrink: 0 }}>{label}:</span>
      <span style={{ color: "#111" }}>{value}</span>
    </div>
  );
}
