"use client";

import { MenuItem } from "@/src/types/components";
import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── FLYOUT PANEL (Portal) ───────────────────────────────────────────────────
export const FlyoutPanel = ({
  title,
  items,
  anchorRect,
  onItemClick,
  onMouseEnter,
  onMouseLeave,
  isPathActive,
  t,
}: {
  title?: string;
  items: MenuItem[];
  anchorRect: DOMRect | null;
  onItemClick: (item: MenuItem) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isPathActive: (path: string) => boolean;
  t: (key: string) => string;
}) => {
  if (!anchorRect || typeof window === "undefined") return null;

  const top = anchorRect.top;
  const left = anchorRect.right + 6;

  return createPortal(
    <div
      className="fixed z-[9999]"
      style={{ top, left }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white dark:bg-[#1a2236] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30 py-1.5 min-w-[200px] max-w-[260px] animate-in fade-in slide-in-from-left-2 duration-150">
        {title && (
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-gray-100 dark:border-white/5 mb-1">
            {title}
          </div>
        )}
        {items.map((item) => {
          const isActive = isPathActive(item.path);
          return (
            <div
              key={item.label}
              onClick={() => onItemClick(item)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? "text-primary bg-primary/5 dark:bg-primary/15"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <span className={`shrink-0 ${isActive ? "text-primary" : "text-slate-400 dark:text-slate-500"}`}>
                {item.icon}
              </span>
              <span className="truncate">{t(item.label)}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
};

// ─── SECTION FLYOUT WRAPPER (for collapsed sidebar sections) ─────────────────
export const SectionFlyoutTrigger = ({
  sectionItems,
  sectionTitle,
  isPathActive,
  onItemClick,
  t,
}: {
  sectionItems: MenuItem[];
  sectionTitle: string;
  isPathActive: (path: string) => boolean;
  onItemClick: (item: MenuItem) => void;
  t: (key: string) => string;
}) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DEBOUNCE = 100;

  const clearTimers = useCallback(() => {
    if (enterTimer.current) { clearTimeout(enterTimer.current); enterTimer.current = null; }
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearTimers();
    enterTimer.current = setTimeout(() => {
      if (containerRef.current) {
        setAnchorRect(containerRef.current.getBoundingClientRect());
      }
      setFlyoutOpen(true);
    }, DEBOUNCE);
  }, [clearTimers]);

  const handleMouseLeave = useCallback(() => {
    clearTimers();
    leaveTimer.current = setTimeout(() => {
      setFlyoutOpen(false);
    }, DEBOUNCE);
  }, [clearTimers]);

  const handleFlyoutEnter = useCallback(() => {
    clearTimers();
  }, [clearTimers]);

  const handleFlyoutLeave = useCallback(() => {
    clearTimers();
    leaveTimer.current = setTimeout(() => {
      setFlyoutOpen(false);
    }, DEBOUNCE);
  }, [clearTimers]);

  const handleFlyoutItemClick = useCallback((item: MenuItem) => {
    setFlyoutOpen(false);
    clearTimers();
    onItemClick(item);
  }, [onItemClick, clearTimers]);

  return (
    <>
      <div className="my-2 border-t border-gray-100 dark:border-gray-800" />
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="space-y-1">
          {sectionItems.sort((a, b) => a.order - b.order).map((item) => {
            const isActive = isPathActive(item.path);
            return (
              <div
                key={item.label}
                onClick={() => handleFlyoutItemClick(item)}
                className={`
                  w-full flex items-center gap-3 rounded-lg transition-all duration-300 mb-1 cursor-pointer
                  px-0 py-3 justify-center
                  ${isActive ? "bg-(--light-primary) dark:bg-primary" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-(--table-hover)"}
                `}
              >
                <span className={`${!isActive ? "text-slate-600 dark:text-amber-50" : "text-primary dark:text-white"} shrink-0`}>{item.icon}</span>
              </div>
            );
          })}
        </div>
      </div>
      {flyoutOpen && (
        <FlyoutPanel
          title={t(sectionTitle)}
          items={sectionItems.sort((a, b) => a.order - b.order)}
          anchorRect={anchorRect}
          onItemClick={handleFlyoutItemClick}
          onMouseEnter={handleFlyoutEnter}
          onMouseLeave={handleFlyoutLeave}
          isPathActive={isPathActive}
          t={t}
        />
      )}
    </>
  );
};
