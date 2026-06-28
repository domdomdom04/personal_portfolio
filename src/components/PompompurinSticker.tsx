import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { POMPOMPURIN_ASCII } from "../assets/pompompurin-ascii";
import "./PompompurinSticker.css";

const STORAGE_KEY = "pompompurin-position";

type Position = { x: number; y: number };

function loadPosition(): Position | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Position;
    if (typeof parsed.x === "number" && typeof parsed.y === "number") return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function PompompurinSticker() {
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(
    null
  );
  const [position, setPosition] = useState<Position>(() => loadPosition() ?? { x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [peelAngle, setPeelAngle] = useState(0);

  const persistPosition = useCallback((pos: Position) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: position.x,
        originY: position.y,
      };
      setDragging(true);
      setHovering(false);
    },
    [position]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    });
    setPeelAngle(Math.max(-12, Math.min(12, dx * 0.04)));
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      dragRef.current = null;
      setDragging(false);
      setPeelAngle(0);
      setPosition((pos) => {
        persistPosition(pos);
        return pos;
      });
    },
    [persistPosition]
  );

  useEffect(() => {
    const onResize = () => {
      setPosition((pos) => {
        persistPosition(pos);
        return pos;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [persistPosition]);

  const showTooltip = hovering && !dragging;

  return (
    <div className="pompompurin-sticker-anchor">
      <div
        className={`pompompurin-sticker${dragging ? " pompompurin-sticker--dragging" : ""}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${peelAngle}deg)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={(e) => {
          setHovering(true);
          setMousePos({ x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => setHovering(false)}
        role="img"
        aria-label="Draggable Pompompurin sticker"
      >
        <div className="pompompurin-sticker__peel" aria-hidden="true" />
        <pre className="pompompurin-sticker__art">{POMPOMPURIN_ASCII}</pre>
      </div>

      {showTooltip &&
        createPortal(
          <span
            className="hover-tooltip"
            style={{ left: mousePos.x + 18, top: mousePos.y + 18 }}
          >
            drag me!
          </span>,
          document.body
        )}
    </div>
  );
}
