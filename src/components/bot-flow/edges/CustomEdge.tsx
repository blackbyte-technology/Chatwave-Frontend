"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/src/elements/ui/button";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useReactFlow, type EdgeProps } from "@xyflow/react";
import { Trash2, X } from "lucide-react";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  // Auto-cancel confirmation after 2 seconds
  useEffect(() => {
    if (confirmDelete) {
      confirmTimerRef.current = setTimeout(() => setConfirmDelete(false), 2000);
    }
    return () => { if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current); };
  }, [confirmDelete]);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
      setConfirmDelete(false);
    }, 200);
  };

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmDelete) {
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
    } else {
      setConfirmDelete(true);
    }
  }, [confirmDelete, setEdges, id]);

  return (
    <>
      {/* Interaction Path (Wider and invisible for better hover detection) */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={40}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="react-flow__edge-interaction nodrag nopan"
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
      />

      {/* Visual Path */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: isHovered ? "var(--indigo-600)" : "var(--violet-600)",
          transition: 'stroke 0.2s',
          pointerEvents: 'none'
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden',
            transition: 'opacity 0.2s ease-in-out, visibility 0.2s',
            zIndex: 1000,
          }}
          className="nodrag nopan"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {confirmDelete ? (
            <Button
              style={{ pointerEvents: 'auto' }}
              className="flex h-8 w-auto px-3 items-center justify-center gap-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 animate-in fade-in zoom-in duration-150"
              onClick={handleDeleteClick}
              title="Click again to confirm"
            >
              <Trash2 size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tight">Confirm?</span>
            </Button>
          ) : (
            <Button
              style={{ pointerEvents: 'auto' }}
              className="flex h-8 w-auto px-3 items-center justify-center gap-2 rounded-full border border-violet-100 bg-white shadow-lg transition-all hover:bg-red-50 hover:text-red-600 text-gray-400 dark:bg-dark-gray dark:border-dark-accent dark:hover:bg-red-900/20 active:scale-95 group"
              onClick={handleDeleteClick}
              title="Remove connection"
            >
              <X size={12} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-tight">Delete</span>
            </Button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
