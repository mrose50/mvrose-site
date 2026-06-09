"use client";

import { useState, useEffect } from "react";
import { WindowState } from "./Desktop";

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: WindowState["id"]) => void;
  isMobile?: boolean;
  startMenuOpen?: boolean;
  onStartClick?: () => void;
}

export default function Taskbar({ windows, onWindowClick, isMobile, startMenuOpen, onStartClick }: TaskbarProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate(
        now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
      );
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: isMobile ? 48 : 40,
        background: "linear-gradient(180deg, #245edc 0%, #1a4fbe 50%, #1f5bb5 100%)",
        borderTop: "2px solid #4b9cf5",
        display: "flex",
        alignItems: "center",
        zIndex: 9999,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.4)",
      }}
    >
      {/* Start button */}
      <button
        onClick={(e) => { e.stopPropagation(); onStartClick?.(); }}
        style={{
          height: isMobile ? 44 : 36,
          padding: isMobile ? "0 14px 0 10px" : "0 12px 0 8px",
          background: startMenuOpen
            ? "linear-gradient(180deg, #2a6010 0%, #1e5010 50%, #1a4c0e 100%)"
            : "linear-gradient(180deg, #60a830 0%, #3e8c1c 50%, #348a18 100%)",
          border: "1px solid #1a5c0a",
          borderRadius: "0 12px 12px 0",
          color: "white",
          fontWeight: "bold",
          fontSize: 13,
          fontFamily: "Tahoma, sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: startMenuOpen
            ? "inset 0 2px 3px rgba(0,0,0,0.4)"
            : "inset 0 1px 0 rgba(255,255,255,0.3), 2px 0 4px rgba(0,0,0,0.3)",
          marginLeft: 2,
          flexShrink: 0,
        }}
      >
        <img src="/icons/start.png" alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
        <span style={{ fontStyle: "italic", letterSpacing: 0.5 }}>start</span>
      </button>

      {/* Divider */}
      <div
        style={{
          width: 2,
          height: 30,
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)",
          margin: "0 4px",
          flexShrink: 0,
        }}
      />

      {/* Window buttons */}
      <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden", padding: "0 4px" }}>
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            style={{
              height: 28,
              padding: "0 10px",
              background: win.isFocused && !win.isMinimized
                ? "linear-gradient(180deg, #1a4fbe 0%, #2060d0 100%)"
                : "linear-gradient(180deg, #3a7bd5 0%, #2a5fb5 100%)",
              border: win.isFocused && !win.isMinimized
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid rgba(255,255,255,0.2)",
              borderRadius: 3,
              color: "white",
              fontSize: 11,
              fontFamily: "Tahoma, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              boxShadow: win.isFocused && !win.isMinimized
                ? "inset 0 1px 2px rgba(0,0,0,0.3)"
                : "inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {win.icon.startsWith("/") ? (
              <img src={win.icon} alt="" style={{ width: 16, height: 16, objectFit: "contain", flexShrink: 0 }} />
            ) : (
              <span style={{ fontSize: 12 }}>{win.icon}</span>
            )}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{win.title}</span>
          </button>
        ))}
      </div>

      {/* System tray */}
      <div
        style={{
          background: "linear-gradient(180deg, #1240ab 0%, #1a4fbe 100%)",
          height: 36,
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderLeft: "1px solid rgba(255,255,255,0.2)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14 }}>🔊</span>
        <div
          onMouseEnter={() => setShowDate(true)}
          onMouseLeave={() => setShowDate(false)}
          style={{ position: "relative", textAlign: "center" }}
        >
          <span
            style={{
              color: "white",
              fontSize: 11,
              fontFamily: "Tahoma, sans-serif",
              minWidth: 50,
              display: "block",
              cursor: "default",
            }}
          >
            {time}
          </span>
          {showDate && (
            <div
              style={{
                position: "fixed",
                bottom: 52,
                right: 8,
                background: "linear-gradient(180deg, #fffde1 0%, #f5f0c8 100%)",
                border: "1px solid #c8a800",
                borderRadius: 3,
                padding: "4px 10px",
                whiteSpace: "nowrap",
                fontSize: 11,
                fontFamily: "Tahoma, sans-serif",
                color: "#222",
                boxShadow: "1px 2px 6px rgba(0,0,0,0.3)",
                pointerEvents: "none",
                zIndex: 99999,
              }}
            >
              {date}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
