"use client";

import { useEffect, useRef } from "react";
import { WindowId } from "./Desktop";
import { profile } from "@/lib/data";

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  isMobile?: boolean;
}

interface AppItem {
  id: WindowId;
  label: string;
  icon: string;
  desc: string;
}

const appItems: AppItem[] = [
  { id: "blog", label: "Blog", icon: "/icons/blog.png", desc: "Read my posts" },
  { id: "about", label: "About Mike", icon: "/icons/about.png", desc: "Who I am" },
  { id: "experience", label: "Work Experience", icon: "/icons/experience.png", desc: "Career history" },
  { id: "contact", label: "Contact", icon: "/icons/contact.png", desc: "Get in touch" },
  { id: "recycle", label: "Recycle Bin", icon: "🗑️", desc: "Trash" },
];

const rightItems = [
  { label: "My Documents", icon: "📁" },
  { label: "My Computer", icon: "🖥️" },
  { label: "Control Panel", icon: "⚙️" },
  { label: "mvrose.com", icon: "🌐", href: "https://mvrose.com" },
  { label: "GitHub", icon: "🐙", href: "https://github.com/mrose50" },
];

export default function StartMenu({ onClose, onOpenWindow, isMobile }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // slight delay so the click that opened us doesn't immediately close us
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  const handleApp = (id: WindowId) => {
    onOpenWindow(id);
    onClose();
  };

  const menuWidth = isMobile ? "100%" : 380;
  const menuHeight = isMobile ? "auto" : "auto";

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        bottom: isMobile ? 48 : 40,
        left: 0,
        width: menuWidth,
        zIndex: 99997,
        fontFamily: "Tahoma, sans-serif",
        boxShadow: "3px -3px 12px rgba(0,0,0,0.5)",
        border: "1px solid #0831d9",
        borderBottom: "none",
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
      }}
    >
      {/* Header — user info */}
      <div
        style={{
          background: "linear-gradient(180deg, #1f6bca 0%, #1558b0 100%)",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4b9cf5, #0058ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            border: "2px solid white",
            flexShrink: 0,
          }}
        >
          👤
        </div>
        <span style={{ color: "white", fontWeight: "bold", fontSize: isMobile ? 16 : 13 }}>
          {profile.name}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", background: "white" }}>
        {/* Left column — apps */}
        <div style={{ flex: 1, background: "white", padding: "6px 0" }}>
          <div style={{ fontSize: isMobile ? 11 : 10, color: "#666", padding: "2px 10px 6px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Open
          </div>
          {appItems.map((item) => (
            <StartMenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              desc={item.desc}
              isMobile={isMobile}
              onClick={() => handleApp(item.id)}
            />
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "#d0cec8", margin: "6px 0" }} />

        {/* Right column — links */}
        <div
          style={{
            width: isMobile ? 130 : 140,
            background: "#dce6f5",
            padding: "6px 0",
            flexShrink: 0,
          }}
        >
          {rightItems.map((item) => (
            <RightMenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isMobile={isMobile}
              onClick={onClose}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "linear-gradient(180deg, #245edc 0%, #1a4fbe 100%)",
          borderTop: "1px solid #0831d9",
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px 8px",
          gap: 4,
        }}
      >
        <FooterBtn icon="🔒" label="Log Off" onClick={onClose} />
        <FooterBtn
          icon="⏻"
          label="Turn Off"
          onClick={() => {
            onClose();
            // Fun easter egg — show a message
            alert("It is now safe to turn off your computer.");
          }}
        />
      </div>
    </div>
  );
}

function StartMenuItem({
  icon, label, desc, isMobile, onClick,
}: {
  icon: string; label: string; desc: string; isMobile?: boolean; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: isMobile ? "9px 12px" : "5px 12px",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#316ac5"; (e.currentTarget as HTMLDivElement).style.color = "white"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = ""; }}
    >
      {icon.startsWith("/") ? (
        <img src={icon} alt="" style={{ width: isMobile ? 28 : 24, height: isMobile ? 28 : 24, objectFit: "contain", flexShrink: 0 }} />
      ) : (
        <span style={{ fontSize: isMobile ? 24 : 20, flexShrink: 0 }}>{icon}</span>
      )}
      <div>
        <div style={{ fontSize: isMobile ? 14 : 11, fontWeight: "bold" }}>{label}</div>
        <div style={{ fontSize: isMobile ? 11 : 10, color: "#888" }}>{desc}</div>
      </div>
    </div>
  );
}

function RightMenuItem({
  icon, label, href, isMobile, onClick,
}: {
  icon: string; label: string; href?: string; isMobile?: boolean; onClick: () => void;
}) {
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: isMobile ? "9px 10px" : "5px 10px",
        cursor: "pointer",
        fontSize: isMobile ? 13 : 11,
        color: "#000",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#316ac5"; (e.currentTarget as HTMLDivElement).style.color = "white"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = "#000"; }}
    >
      <span style={{ fontSize: isMobile ? 16 : 14 }}>{icon}</span>
      <span style={{ fontWeight: "bold" }}>{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return <div onClick={onClick}>{inner}</div>;
}

function FooterBtn({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "linear-gradient(180deg, #3a7bd5 0%, #2060c0 100%)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 3,
        color: "white",
        fontSize: 11,
        fontFamily: "Tahoma, sans-serif",
        padding: "3px 10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
