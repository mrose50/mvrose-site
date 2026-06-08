"use client";

import { useState, useCallback, useEffect } from "react";
import Window from "./Window";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import AboutWindow from "./windows/AboutWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import BlogWindow, { PostMeta } from "./windows/BlogWindow";
import ContactWindow from "./windows/ContactWindow";
import RecycleBinWindow from "./windows/RecycleBinWindow";
import BootScreen from "./BootScreen";

export type WindowId = "about" | "experience" | "blog" | "contact" | "recycle";

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  preMaximize?: { position: { x: number; y: number }; size: { width: number; height: number } };
}

const defaultWindows: WindowState[] = [
  {
    id: "about",
    title: "About Mike",
    icon: "/icons/about.png",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    isMaximized: false,
    zIndex: 0,
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
    isMaximized: false,
    zIndex: 0,
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
    isMaximized: false,
    zIndex: 0,
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
    isMaximized: false,
    zIndex: 0,
    position: { x: 300, y: 140 },
    size: { width: 360, height: 280 },
  },
  {
    id: "recycle",
    title: "Recycle Bin",
    icon: "🗑️",
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 400, y: 120 },
    size: { width: 420, height: 300 },
  },
];

const desktopIcons: { id: WindowId; label: string; icon: string }[] = [
  { id: "about", label: "About Mike", icon: "/icons/about.png" },
  { id: "experience", label: "Work Experience", icon: "/icons/experience.png" },
  { id: "blog", label: "Blog", icon: "/icons/blog.png" },
  { id: "contact", label: "Contact", icon: "/icons/contact.png" },
  { id: "recycle", label: "Recycle Bin", icon: "🗑️" },
];

interface DesktopProps {
  posts: PostMeta[];
}

export default function Desktop({ posts }: DesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [zCounter, setZCounter] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [openPostSlug, setOpenPostSlug] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      setBooting(false);
    } else {
      sessionStorage.setItem("booted", "1");
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Restore state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openIds = (params.get("open") ?? "").split(",").filter(Boolean) as WindowId[];
    const post = params.get("post");
    if (post) setOpenPostSlug(post);
    if (openIds.length > 0) {
      setZCounter((z) => {
        let next = z;
        setWindows((prev) =>
          prev.map((w) => {
            if (openIds.includes(w.id)) {
              next += 1;
              return { ...w, isOpen: true, isFocused: w.id === openIds[openIds.length - 1], zIndex: next };
            }
            return w;
          })
        );
        return next;
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync URL whenever window state or open post changes
  useEffect(() => {
    const openIds = windows
      .filter((w) => w.isOpen && !w.isMinimized)
      .map((w) => w.id);
    const params = new URLSearchParams();
    if (openIds.length > 0) params.set("open", openIds.join(","));
    if (openPostSlug) params.set("post", openPostSlug);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [windows, openPostSlug]);

  const focusWindow = useCallback(
    (id: WindowId) => {
      setZCounter((z) => {
        const next = z + 1;
        setWindows((prev) =>
          prev.map((w) => ({
            ...w,
            isFocused: w.id === id,
            zIndex: w.id === id ? next : w.zIndex,
          }))
        );
        return next;
      });
    },
    []
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      setZCounter((z) => {
        const next = z + 1;
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, isFocused: true, zIndex: next }
              : { ...w, isFocused: false }
          )
        );
        return next;
      });
    },
    []
  );

  const closeWindow = useCallback((id: WindowId) => {
    if (id === "blog") setOpenPostSlug(null);
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

  const updateSize = useCallback(
    (id: WindowId, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, size } : w))
      );
    },
    []
  );

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            position: w.preMaximize?.position ?? w.position,
            size: w.preMaximize?.size ?? w.size,
            preMaximize: undefined,
          };
        }
        return {
          ...w,
          isMaximized: true,
          preMaximize: { position: w.position, size: w.size },
        };
      })
    );
  }, []);

  const windowContent: Record<WindowId, React.ReactNode> = {
    about: <AboutWindow />,
    experience: <ExperienceWindow />,
    blog: <BlogWindow posts={posts} initialPost={openPostSlug ?? undefined} onPostChange={setOpenPostSlug} />,
    contact: <ContactWindow />,
    recycle: <RecycleBinWindow />,
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Desktop icons */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: isMobile ? 16 : "auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "1fr",
          gap: isMobile ? 8 : 16,
        }}
      >
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            isMobile={isMobile}
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
            isMobile={isMobile}
            zIndex={win.zIndex}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            isMaximized={win.isMaximized}
            onMove={(pos) => updatePosition(win.id, pos)}
            onResize={(size) => updateSize(win.id, size)}
            onMaximize={() => toggleMaximize(win.id)}
          >
            {windowContent[win.id]}
          </Window>
        ) : null
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        isMobile={isMobile}
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

      {/* Boot screen — shown once per session */}
      {booting && <BootScreen onComplete={() => setBooting(false)} />}
    </div>
  );
}
