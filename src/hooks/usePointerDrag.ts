import { useCallback, useRef, useState } from "react";

type DragState = {
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type UsePointerDragOptions = {
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  disabled?: boolean;
};

export function usePointerDrag({
  position,
  onPositionChange,
  onDragStart,
  onDragEnd,
  disabled = false,
}: UsePointerDragOptions) {
  const dragRef = useRef<DragState | null>(null);
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      e.stopPropagation();
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: position.x,
        originY: position.y,
      };
      setDragging(true);
      onDragStart?.();
    },
    [disabled, onDragStart, position.x, position.y]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onPositionChange({
        x: dragRef.current.originX + dx,
        y: dragRef.current.originY + dy,
      });
    },
    [onPositionChange]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      dragRef.current = null;
      setDragging(false);
      onDragEnd?.();
    },
    [onDragEnd]
  );

  return {
    dragging,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    },
  };
}
