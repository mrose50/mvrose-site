"use client";

import { useState } from "react";

export default function RecycleBinWindow() {
  const [clicked, setClicked] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);

  if (doubleClicked) {
    return (
      <div style={{ padding: 24, fontFamily: "Tahoma, sans-serif", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💀</div>
        <div style={{ fontSize: 13, fontWeight: "bold", color: "#cc0000", marginBottom: 8 }}>
          totallynotmalware.exe is running...
        </div>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 16 }}>
          Just kidding. But you really shouldn&apos;t double-click random .exe files.
        </div>
        <div
          style={{
            background: "#f0efe6",
            border: "1px solid #c0bdb0",
            borderRadius: 3,
            padding: "8px 12px",
            fontSize: 10,
            color: "#333",
            textAlign: "left",
            fontFamily: "Courier New, monospace",
            lineHeight: 1.8,
          }}
        >
          <div>C:\WINDOWS\system32&gt; totallynotmalware.exe</div>
          <div>Initializing... ██████████ 100%</div>
          <div>Stealing your passwords... just kidding.</div>
          <div>Mining crypto... nope.</div>
          <div>Actually just saying hi. 👋</div>
          <div style={{ marginTop: 8, color: "#0058ee" }}>Process complete. Have a great day.</div>
        </div>
        <button
          onClick={() => setDoubleClicked(false)}
          style={{
            marginTop: 16,
            background: "linear-gradient(180deg, #f5f4ea 0%, #dbd8c2 100%)",
            border: "1px solid #aca899",
            borderRadius: 3,
            padding: "4px 16px",
            fontSize: 11,
            fontFamily: "Tahoma, sans-serif",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Tahoma, sans-serif" }}>
      {/* Toolbar */}
      <div
        style={{
          background: "linear-gradient(180deg, #dfe8f5 0%, #c8d8ee 100%)",
          borderBottom: "1px solid #a8bcd0",
          padding: "4px 8px",
          fontSize: 11,
          color: "#555",
          display: "flex",
          gap: 12,
        }}
      >
        <span style={{ cursor: "pointer" }}>File</span>
        <span style={{ cursor: "pointer" }}>Edit</span>
        <span style={{ cursor: "pointer" }}>View</span>
        <span style={{ cursor: "pointer" }}>Help</span>
      </div>

      {/* Address bar */}
      <div
        style={{
          background: "white",
          border: "1px solid #c0bdb0",
          margin: "6px 8px",
          padding: "2px 6px",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ color: "#555" }}>Address:</span>
        <span><img src="/icons/recycle.png" alt="" style={{width:16,height:16,objectFit:"contain",verticalAlign:"middle",marginRight:4}}/>Recycle Bin</span>
      </div>

      {/* File list */}
      <div style={{ padding: "4px 8px" }}>
        <div
          onClick={() => setClicked(true)}
          onDoubleClick={() => setDoubleClicked(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "4px 6px",
            background: clicked ? "#0058ee" : "transparent",
            color: clicked ? "white" : "#000",
            borderRadius: 2,
            cursor: "default",
            userSelect: "none",
          }}
        >
          <span style={{ fontSize: 24 }}>⚙️</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: clicked ? "bold" : "normal" }}>
              totallynotmalware.exe
            </div>
            <div style={{ fontSize: 10, color: clicked ? "rgba(255,255,255,0.8)" : "#888" }}>
              Application • 6.66 MB • Deleted 1/1/2004
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#ece9d8",
          borderTop: "1px solid #c0bdb0",
          padding: "2px 8px",
          fontSize: 10,
          color: "#555",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>1 object(s)</span>
        <span>6.66 MB</span>
      </div>
    </div>
  );
}
