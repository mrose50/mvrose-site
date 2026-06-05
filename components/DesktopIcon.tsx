"use client";

import { useState } from "react";

interface DesktopIconProps {
  label: string;
  icon: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ label, icon, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onDoubleClick={onDoubleClick}
      onClick={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: 72,
        padding: 4,
        borderRadius: 2,
        cursor: "default",
        outline: "none",
        background: selected ? "rgba(0,88,238,0.4)" : "transparent",
        border: selected ? "1px dotted rgba(255,255,255,0.8)" : "1px solid transparent",
      }}
    >
      <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
      <span
        style={{
          color: "white",
          fontSize: 11,
          fontFamily: "Tahoma, sans-serif",
          textAlign: "center",
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
          wordBreak: "break-word",
          lineHeight: 1.3,
          background: selected ? "transparent" : "transparent",
        }}
      >
        {label}
      </span>
    </div>
  );
}
