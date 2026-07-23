/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/src/lib/utils";
import { BaseNodeProps } from "@/src/types/botFlow";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X, Trash2 } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

export function BaseNode({ id, title, icon, iconBgColor = "bg-gray-100", iconColor = "text-gray-600", borderColor = "border-gray-200", handleColor = "bg-emerald-500!", errors = [], children, showInHandle = true, showOutHandle = true, headerRight, className }: BaseNodeProps) {
  const { deleteElements } = useReactFlow();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-cancel confirmation after 2 seconds
  useEffect(() => {
    if (confirmDelete) {
      timerRef.current = setTimeout(() => setConfirmDelete(false), 2000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [confirmDelete]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmDelete) {
      deleteElements({ nodes: [{ id }] });
    } else {
      setConfirmDelete(true);
    }
  }, [confirmDelete, deleteElements, id]);

  return (
    <div className={cn("group relative w-72 rounded-lg border bg-white shadow-md transition-all hover:shadow-xl dark:bg-(--card-color) dark:border-(--card-border-color)", errors.length > 0 ? "border-red-400 ring-1 ring-red-400/20" : borderColor, className)}>
      {/* Target Handle */}
      {showInHandle && <Handle type="target" id="tgt" position={Position.Left} className={cn("w-3! h-3! border-2! border-white! dark:border-(--card-border-color)! shadow-sm z-50", handleColor)} />}

      {/* Node Header */}
      <div className={cn("flex items-center gap-2.5 px-4 py-3 border-b rounded-t-lg", iconBgColor)}>
        <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-sm bg-white/20 backdrop-blur-sm", iconColor)}>{React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}</div>
        <div className="flex-1 min-w-0">
          <div className={cn("text-[13px] font-semibold truncate", iconColor)}>{title}</div>
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {confirmDelete ? (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500 text-white text-[10px] font-bold shadow-sm hover:bg-red-600 transition-colors animate-in fade-in zoom-in duration-150"
            >
              <Trash2 size={11} />
              Delete?
            </button>
          ) : (
            <button
              onClick={handleDelete}
              className="p-1 rounded-md text-white/40 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Node Content */}
      <div className="p-4 space-y-4">{children}</div>

      {/* Source Handle */}
      {showOutHandle && <Handle type="source" id="src" position={Position.Right} className={cn("w-3! h-3! border-2! border-white! dark:border-dark-gray! shadow-sm z-50", handleColor)} />}
    </div>
  );
}
