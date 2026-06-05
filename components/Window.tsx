"use client";

import { useRef, useCallback, useEffect } from "react";

interface WindowProps {
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isFocused: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export default function Window({
  title,
  icon,
  position,
  size,
  isFocused,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onMove,
  children,
}: WindowProps) {
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const posRef = useRef(position);

  useEffect(() => {
    posRef.current = position;
  }, [position]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      onFocus();
      dragging.current = true;
      dragOffset.current = {
        x: e.clientX - posRef.current.x,
        y: e.clientY - posRef.current.y,
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!dragging.current) return;
        const newPos = {
          x: Math.max(0, e.clientX - dragOffset.current.x),
          y: Math.max(0, e.clientY - dragOffset.current.y),
        };
        posRef.current = newPos;
        onMove(newPos);
      };

      const onMouseUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [onFocus, onMove]
  );

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        boxShadow: isFocused
          ? "3px 3px 10px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.3)"
          : "2px 2px 6px rgba(0,0,0,0.4)",
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
        border: "1px solid #0831d9",
        userSelect: "none",
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={onMouseDown}
        style={{
          background: isFocused
            ? "linear-gradient(180deg, #4b9cf5 0%, #1660c8 8%, #0058ee 40%, #3a93ff 100%)"
            : "linear-gradient(180deg, #9db8d2 0%, #6a97c0 8%, #4a7ca5 40%, #7ab0d0 100%)",
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6px",
          cursor: "move",
        }}
      >
        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
          {icon.startsWith("/") ? (
            <img src={icon} alt="" style={{ width: 16, height: 16, objectFit: "contain", flexShrink: 0 }} />
          ) : (
            <span style={{ fontSize: 14 }}>{icon}</span>
          )}
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 12,
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </span>
        </div>

        {/* Window controls */}
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <TitleBarBtn
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            color="#f5c400"
            symbol="─"
          />
          <TitleBarBtn
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            color="#e8422a"
            symbol="✕"
          />
        </div>
      </div>

      {/* Window body */}
      <div
        style={{
          background: "#ece9d8",
          height: size.height - 30,
          overflow: "auto",
          borderTop: "1px solid #0058ee",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TitleBarBtn({
  onClick,
  color,
  symbol,
}: {
  onClick: (e: React.MouseEvent) => void;
  color: string;
  symbol: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 21,
        height: 21,
        background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
        border: "1px solid rgba(0,0,0,0.4)",
        borderRadius: 3,
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textShadow: "0 1px 1px rgba(0,0,0,0.5)",
        lineHeight: 1,
      }}
    >
      {symbol}
    </button>
  );
}
