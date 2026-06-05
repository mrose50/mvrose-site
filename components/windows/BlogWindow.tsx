"use client";

import { useState } from "react";
import { marked } from "marked";

export interface PostMeta {
  slug: string;
  title: string;
  year: string;
  description: string;
  content: string;
}

interface BlogWindowProps {
  posts: PostMeta[];
}

const years = (posts: PostMeta[]) =>
  [...new Set(posts.map((p) => p.year))].sort().reverse();

export default function BlogWindow({ posts }: BlogWindowProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [openPost, setOpenPost] = useState<PostMeta | null>(null);

  const filtered = selectedYear
    ? posts.filter((p) => p.year === selectedYear)
    : posts;

  if (openPost) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "Tahoma, sans-serif" }}>
        {/* Back bar */}
        <div
          style={{
            background: "linear-gradient(180deg, #dfe8f5 0%, #c8d8ee 100%)",
            borderBottom: "1px solid #a8bcd0",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setOpenPost(null)}
            style={{
              background: "linear-gradient(180deg, #f5f4ea 0%, #dbd8c2 100%)",
              border: "1px solid #aca899",
              borderRadius: 3,
              padding: "2px 10px",
              fontSize: 11,
              fontFamily: "Tahoma, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ← Back
          </button>
          <span style={{ fontSize: 12, fontWeight: "bold", color: "#003399" }}>
            {openPost.title}
          </span>
        </div>

        {/* Post content */}
        <div
          style={{ flex: 1, overflow: "auto", padding: "12px 16px" }}
          dangerouslySetInnerHTML={{
            __html: marked(openPost.content) as string,
          }}
          className="prose-xp"
        />

        <style>{`
          .prose-xp h2 { font-size: 13px; font-weight: bold; color: #003399; margin: 12px 0 4px; border-bottom: 1px solid #c0bdb0; padding-bottom: 2px; }
          .prose-xp h3 { font-size: 12px; font-weight: bold; color: #333; margin: 10px 0 3px; }
          .prose-xp p { font-size: 11px; color: #222; margin: 0 0 8px; line-height: 1.6; }
          .prose-xp ul, .prose-xp ol { font-size: 11px; color: #222; margin: 0 0 8px; padding-left: 20px; line-height: 1.6; }
          .prose-xp li { margin-bottom: 3px; }
          .prose-xp code { background: #f0efe6; border: 1px solid #c0bdb0; border-radius: 2px; padding: 0 3px; font-size: 10px; font-family: 'Courier New', monospace; }
          .prose-xp pre { background: #f0efe6; border: 1px solid #c0bdb0; border-radius: 3px; padding: 8px; overflow-x: auto; margin: 0 0 8px; }
          .prose-xp pre code { background: none; border: none; padding: 0; font-size: 10px; }
          .prose-xp blockquote { border-left: 3px solid #4b9cf5; padding-left: 8px; margin: 0 0 8px; color: #555; font-style: italic; }
          .prose-xp strong { font-weight: bold; color: #111; }
          .prose-xp a { color: #0058ee; }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", fontFamily: "Tahoma, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 100,
          background: "linear-gradient(180deg, #dfe8f5 0%, #c4d4e8 100%)",
          borderRight: "1px solid #a8bcd0",
          padding: "8px 0",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: "bold",
            color: "#555",
            padding: "0 8px 6px",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Filter by Year
        </div>
        <SidebarItem label="All Posts" active={selectedYear === null} onClick={() => setSelectedYear(null)} />
        {years(posts).map((y) => (
          <SidebarItem key={y} label={y} active={selectedYear === y} onClick={() => setSelectedYear(y)} />
        ))}
      </div>

      {/* Post list */}
      <div style={{ flex: 1, overflow: "auto", padding: 10 }}>
        <div style={{ marginBottom: 8, fontSize: 11, color: "#555" }}>
          {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          {selectedYear ? ` in ${selectedYear}` : " total"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map((post, i) => (
            <div
              key={i}
              onClick={() => setOpenPost(post)}
              style={{
                background: "white",
                border: "1px solid #c0bdb0",
                borderRadius: 3,
                padding: "8px 10px",
                cursor: "pointer",
                boxShadow: "1px 1px 2px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#f0f4fc"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "white"; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: 11, color: "#003399", marginBottom: 2 }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>{post.year}</div>
                  <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{post.description}</div>
                </div>
                <span style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>▶</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "5px 12px",
        background: active ? "linear-gradient(180deg, #4b9cf5 0%, #0058ee 100%)" : "transparent",
        color: active ? "white" : "#333",
        border: "none",
        fontSize: 11,
        fontFamily: "Tahoma, sans-serif",
        cursor: "pointer",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </button>
  );
}
