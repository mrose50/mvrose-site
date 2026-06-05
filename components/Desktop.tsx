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
    icon: "👤",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 80, y: 60 },
    size: { width: 480, height: 340 },
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: "💼",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 140, y: 100 },
    size: { width: 520, height: 420 },
  },
  {
    id: "blog",
    title: "Blog Posts",
    icon: "📝",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 200, y: 80 },
    size: { width: 500, height: 460 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "📧",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 300, y: 140 },
    size: { width: 360, height: 280 },
  },
];

const desktopIcons: { id: WindowId; label: string; icon: string }[] = [
  { id: "about", label: "About Mike", icon: "👤" },
  { id: "experience", label: "Work Experience", icon: "💼" },
  { id: "blog", label: "Blog", icon: "📝" },
  { id: "contact", label: "Contact", icon: "📧" },
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
      style={{
        background: "linear-gradient(180deg, #2f6ab5 0%, #3a7bc8 40%, #5b9bd5 100%)",
      }}
    >
      {/* Subtle desktop texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />

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
