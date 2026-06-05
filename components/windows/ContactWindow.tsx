import { profile } from "@/lib/data";

export default function ContactWindow() {
  return (
    <div style={{ padding: 16, fontFamily: "Tahoma, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(180deg, #dfe8f5 0%, #c8d8ee 100%)",
          border: "1px solid #7a9ec8",
          borderRadius: 4,
          padding: "10px 14px",
          marginBottom: 14,
          fontSize: 11,
          color: "#333",
          lineHeight: 1.5,
        }}
      >
        Feel free to reach out — always happy to talk security, tech, or anything else.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <ContactRow
          icon="📧"
          label="Email"
          href={`mailto:${profile.email}`}
          display={profile.email}
        />
        <ContactRow
          icon="💼"
          label="LinkedIn"
          href={profile.linkedin}
          display="michael-rose"
        />
        <ContactRow
          icon="🧵"
          label="Threads"
          href={profile.threads}
          display="@mikevrose"
        />
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  href,
  display,
}: {
  icon: string;
  label: string;
  href: string;
  display: string;
}) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #c0bdb0",
        borderRadius: 3,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "1px 1px 2px rgba(0,0,0,0.08)",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>
          {label}
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0058ee",
            fontSize: 12,
            textDecoration: "none",
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = "underline")}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = "none")}
        >
          {display}
        </a>
      </div>
      <span style={{ fontSize: 10, color: "#aaa" }}>↗</span>
    </div>
  );
}
