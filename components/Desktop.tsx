"use client";

import { useState, useCallback } from "react";
import Window from "./Window";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import AboutWindow from "./windows/AboutWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import BlogWindow, { PostMeta } from "./windows/BlogWindow";
import ContactWindow from "./windows/ContactWindow";

export type WindowId = "about" | "experience" | "blog" | "contact";

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const defaultWindows: WindowState[] = [
  {
    id: "about",
    title: "About Mike",
    icon: "/icons/about.png",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 80, y: 60 },
    size: { width: 480, height: 340 },
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: "/icons/experience.png",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 140, y: 100 },
    size: { width: 520, height: 420 },
  },
  {
    id: "blog",
    title: "Blog Posts",
    icon: "/icons/blog.png",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 200, y: 80 },
    size: { width: 500, height: 460 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "/icons/contact.png",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 300, y: 140 },
    size: { width: 360, height: 280 },
  },
];

const desktopIcons: { id: WindowId; label: string; icon: string }[] = [
  { id: "about", label: "About Mike", icon: "/icons/about.png" },
  { id: "experience", label: "Work Experience", icon: "/icons/experience.png" },
  { id: "blog", label: "Blog", icon: "/icons/blog.png" },
  { id: "contact", label: "Contact", icon: "/icons/contact.png" },
];

interface DesktopProps {
  posts: PostMeta[];
}

export default function Desktop({ posts }: DesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [zCounter, setZCounter] = useState(10);

  const focusWindow = useCallback(
    (id: WindowId) => {
      const z = zCounter + 1;
      setZCounter(z);
      setWindows((prev) =>
        prev.map((w) => ({ ...w, isFocused: w.id === id }))
      );
    },
    [zCounter]
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      const z = zCounter + 1;
      setZCounter(z);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, isFocused: true }
            : { ...w, isFocused: false }
        )
      );
    },
    [zCounter]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false, isFocused: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true, isFocused: false } : w))
    );
  }, []);

  const updatePosition = useCallback(
    (id: WindowId, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  const windowContent: Record<WindowId, React.ReactNode> = {
    about: <AboutWindow />,
    experience: <ExperienceWindow />,
    blog: <BlogWindow posts={posts} />,
    contact: <ContactWindow />,
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#4a90d9" }}
    >
      {/* XP Bliss-style wallpaper */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6abf" />
            <stop offset="40%" stopColor="#4a9de0" />
            <stop offset="75%" stopColor="#7bbfe8" />
            <stop offset="100%" stopColor="#a8d4f0" />
          </linearGradient>
          <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ab52e" />
            <stop offset="60%" stopColor="#3d8c1a" />
            <stop offset="100%" stopColor="#2d6e10" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6dc93a" />
            <stop offset="100%" stopColor="#4aaa20" />
          </linearGradient>
          <linearGradient id="hill3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ea822" />
            <stop offset="100%" stopColor="#357a12" />
          </linearGradient>
          <radialGradient id="sun" cx="68%" cy="28%" r="18%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          {/* Cloud filter for softness */}
          <filter id="blur2">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1440" height="900" fill="url(#sky)" />

        {/* Sun glow */}
        <ellipse cx="980" cy="250" rx="260" ry="220" fill="url(#sun)" />

        {/* Clouds */}
        <g opacity="0.9" filter="url(#blur2)">
          <ellipse cx="980" cy="180" rx="120" ry="38" fill="white" opacity="0.85" />
          <ellipse cx="1050" cy="165" rx="80" ry="30" fill="white" opacity="0.9" />
          <ellipse cx="910" cy="190" rx="70" ry="25" fill="white" opacity="0.8" />

          <ellipse cx="300" cy="140" rx="90" ry="28" fill="white" opacity="0.7" />
          <ellipse cx="360" cy="128" rx="60" ry="22" fill="white" opacity="0.75" />
          <ellipse cx="240" cy="148" rx="55" ry="20" fill="white" opacity="0.65" />

          <ellipse cx="620" cy="220" rx="70" ry="22" fill="white" opacity="0.6" />
          <ellipse cx="680" cy="210" rx="50" ry="18" fill="white" opacity="0.65" />

          <ellipse cx="1280" cy="160" rx="80" ry="25" fill="white" opacity="0.55" />
          <ellipse cx="1340" cy="148" rx="55" ry="20" fill="white" opacity="0.6" />
        </g>

        {/* Background distant hills */}
        <path
          d="M0 620 Q180 480 360 550 Q540 480 720 520 Q900 460 1080 510 Q1260 470 1440 530 L1440 900 L0 900 Z"
          fill="#4a9e28"
          opacity="0.5"
        />

        {/* Main rolling hill — the Bliss centerpiece */}
        <path
          d="M0 720 Q120 560 280 600 Q420 560 560 610 Q680 560 800 580 Q950 520 1100 590 Q1260 540 1440 610 L1440 900 L0 900 Z"
          fill="url(#hill1)"
        />

        {/* Foreground hill layer for depth */}
        <path
          d="M0 820 Q200 700 400 740 Q580 700 720 730 Q900 695 1100 740 Q1280 710 1440 750 L1440 900 L0 900 Z"
          fill="url(#hill2)"
        />

        {/* Bottom ground */}
        <path
          d="M0 870 Q360 840 720 860 Q1080 840 1440 865 L1440 900 L0 900 Z"
          fill="url(#hill3)"
        />
      </svg>

      {/* Desktop icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onDoubleClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((win, i) =>
        win.isOpen && !win.isMinimized ? (
          <Window
            key={win.id}
            title={win.title}
            icon={win.icon}
            position={win.position}
            size={win.size}
            isFocused={win.isFocused}
            zIndex={10 + i + (win.isFocused ? 100 : 0)}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMove={(pos) => updatePosition(win.id, pos)}
          >
            {windowContent[win.id]}
          </Window>
        ) : null
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          const win = windows.find((w) => w.id === id);
          if (!win) return;
          if (win.isMinimized) {
            openWindow(id);
          } else if (win.isFocused) {
            minimizeWindow(id);
          } else {
            focusWindow(id);
          }
        }}
      />
    </div>
  );
}
