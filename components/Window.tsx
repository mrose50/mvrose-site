"use client";

import { useRef, useCallback, useEffect } from "react";

interface WindowProps {
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isFocused: boolean;
  zIndex: number;
  isMobile?: boolean;
  isMaximized?: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  onResize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

const MIN_WIDTH = 260;
const MIN_HEIGHT = 180;

export default function Window({
  title,
  icon,
  position,
  size,
  isFocused,
  zIndex,
  isMobile,
  isMaximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
  children,
}: WindowProps) {
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const posRef = useRef(position);
  const sizeRef = useRef(size);

  useEffect(() => { posRef.current = position; }, [position]);
  useEffect(() => { sizeRef.current = size; }, [size]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || isMaximized) return;
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
    [onFocus, onMove, isMobile, isMaximized]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isMobile) return;
      onFocus();
      const touch = e.touches[0];
      dragging.current = true;
      dragOffset.current = {
        x: touch.clientX - posRef.current.x,
        y: touch.clientY - posRef.current.y,
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!dragging.current) return;
        const touch = e.touches[0];
        const newPos = {
          x: Math.max(0, touch.clientX - dragOffset.current.x),
          y: Math.max(0, touch.clientY - dragOffset.current.y),
        };
        posRef.current = newPos;
        onMove(newPos);
      };

      const onTouchEnd = () => {
        dragging.current = false;
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    },
    [onFocus, onMove, isMobile]
  );

  const startResize = useCallback(
    (e: React.MouseEvent, direction: "e" | "s" | "se") => {
      if (isMobile) return;
      e.preventDefault();
      e.stopPropagation();
      onFocus();

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = sizeRef.current.width;
      const startH = sizeRef.current.height;

      const onMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const newSize = {
          width: direction === "s" ? startW : Math.max(MIN_WIDTH, startW + dx),
          height: direction === "e" ? startH : Math.max(MIN_HEIGHT, startH + dy),
        };
        sizeRef.current = newSize;
        onResize(newSize);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [onFocus, onResize, isMobile]
  );

  const mobileStyle: React.CSSProperties = isMobile
    ? {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 48,
        width: "100%",
        height: "calc(100% - 48px)",
        zIndex,
        borderRadius: 0,
        border: "none",
        boxShadow: "none",
        overflow: "hidden",
        userSelect: "none",
      }
    : isMaximized
    ? {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "calc(100% - 40px)",
        zIndex,
        borderRadius: 0,
        overflow: "hidden",
        border: "none",
        boxShadow: "none",
        userSelect: "none",
      }
    : {
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
      };

  const titleBarHeight = isMobile ? 44 : 30;

  return (
    <div onMouseDown={isMobile ? undefined : onFocus} style={mobileStyle}>
      {/* Title bar */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onDoubleClick={isMobile ? undefined : onMaximize}
        style={{
          background: isFocused
            ? "linear-gradient(180deg, #4b9cf5 0%, #1660c8 8%, #0058ee 40%, #3a93ff 100%)"
            : "linear-gradient(180deg, #9db8d2 0%, #6a97c0 8%, #4a7ca5 40%, #7ab0d0 100%)",
          height: titleBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6px",
          cursor: isMobile || isMaximized ? "default" : "move",
        }}
      >
        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
          {icon.startsWith("/") ? (
            <img src={icon} alt="" style={{ width: isMobile ? 20 : 16, height: isMobile ? 20 : 16, objectFit: "contain", flexShrink: 0 }} />
          ) : (
            <span style={{ fontSize: isMobile ? 18 : 14 }}>{icon}</span>
          )}
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: isMobile ? 15 : 12,
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
        <div style={{ display: "flex", gap: isMobile ? 6 : 2, flexShrink: 0 }}>
          {!isMobile && (
            <>
              <TitleBarBtn
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                color="#f5c400"
                symbol="─"
                size={21}
              />
              <TitleBarBtn
                onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                color="#2ca827"
                symbol={isMaximized ? "❐" : "□"}
                size={21}
              />
            </>
          )}
          <TitleBarBtn
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            color="#e8422a"
            symbol="✕"
            size={isMobile ? 36 : 21}
          />
        </div>
      </div>

      {/* Window body */}
      <div
        style={{
          background: "#ece9d8",
          height: `calc(100% - ${titleBarHeight}px)`,
          overflow: "auto",
          borderTop: "1px solid #0058ee",
        }}
      >
        {children}
      </div>

      {/* Resize handles — desktop only, not when maximized */}
      {!isMobile && !isMaximized && (
        <>
          {/* Right edge */}
          <div
            onMouseDown={(e) => startResize(e, "e")}
            style={{
              position: "absolute",
              right: 0,
              top: titleBarHeight,
              width: 5,
              bottom: 5,
              cursor: "ew-resize",
            }}
          />
          {/* Bottom edge */}
          <div
            onMouseDown={(e) => startResize(e, "s")}
            style={{
              position: "absolute",
              bottom: 0,
              left: 5,
              right: 5,
              height: 5,
              cursor: "ns-resize",
            }}
          />
          {/* Bottom-right corner */}
          <div
            onMouseDown={(e) => startResize(e, "se")}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              cursor: "nwse-resize",
              background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%)",
            }}
          />
        </>
      )}
    </div>
  );
}

function TitleBarBtn({
  onClick,
  color,
  symbol,
  size = 21,
}: {
  onClick: (e: React.MouseEvent) => void;
  color: string;
  symbol: string;
  size?: number;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
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
