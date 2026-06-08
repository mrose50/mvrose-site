"use client";

import { useState, useEffect } from "react";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    const doneTimer = setTimeout(onComplete, 3700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        userSelect: "none",
      }}
    >
      {/* Windows XP Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {/* Flag */}
        <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ width: 28, height: 28, background: "#f35325", borderRadius: "3px 0 0 0", transform: "skewY(-8deg)" }} />
            <div style={{ width: 28, height: 28, background: "#05a6f0", borderRadius: "0 0 0 3px", transform: "skewY(-8deg)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ width: 28, height: 28, background: "#81bc06", borderRadius: "0 3px 0 0", transform: "skewY(-8deg)" }} />
            <div style={{ width: 28, height: 28, background: "#ffba08", borderRadius: "0 0 3px 0", transform: "skewY(-8deg)" }} />
          </div>
        </div>

        {/* Text */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <span
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: 300,
              fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
              letterSpacing: 1,
            }}
          >
            Windows
          </span>
          <span
            style={{
              color: "#f90",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
              fontStyle: "italic",
              marginBottom: 1,
            }}
          >
            XP
          </span>
        </div>

        <div
          style={{
            color: "#ccc",
            fontSize: 12,
            fontFamily: "Tahoma, sans-serif",
            letterSpacing: 3,
            marginTop: -4,
          }}
        >
          Professional
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 180,
          height: 14,
          background: "#111",
          border: "1px solid #444",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            bottom: 2,
            display: "flex",
            gap: 3,
            animation: "xp-scroll 1.2s linear infinite",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: "100%",
                background: "linear-gradient(180deg, #e8a000 0%, #c47800 100%)",
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes xp-scroll {
            from { transform: translateX(-75px); }
            to   { transform: translateX(0px); }
          }
        `}</style>
      </div>

      {/* Copyright */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          color: "#555",
          fontSize: 10,
          fontFamily: "Tahoma, sans-serif",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Copyright © Microsoft Corporation<br />
        Build 2600.xpsp_sp2_rtm.040803-2158
      </div>
    </div>
  );
}
