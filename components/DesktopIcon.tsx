"use client";

import { useState } from "react";

interface DesktopIconProps {
  label: string;
  icon: string;
  onDoubleClick: () => void;
  isMobile?: boolean;
}

export default function DesktopIcon({ label, icon, onDoubleClick, isMobile }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onDoubleClick={isMobile ? undefined : onDoubleClick}
      onClick={isMobile ? onDoubleClick : () => setSelected(true)}
      onBlur={() => setSelected(false)}
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: isMobile ? 80 : 72,
        padding: isMobile ? 8 : 4,
        borderRadius: 2,
        cursor: "default",
        outline: "none",
        background: selected ? "rgba(0,88,238,0.4)" : "transparent",
        border: selected ? "1px dotted rgba(255,255,255,0.8)" : "1px solid transparent",
      }}
    >
      {icon.startsWith("/") ? (
        <img src={icon} alt="" style={{ width: isMobile ? 56 : 48, height: isMobile ? 56 : 48, objectFit: "contain" }} />
      ) : (
        <span style={{ fontSize: isMobile ? 40 : 32, lineHeight: 1 }}>{icon}</span>
      )}
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
