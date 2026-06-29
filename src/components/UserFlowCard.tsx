import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./UserFlowCard.css";

type UserFlowCardProps = {
  src: string;
  alt: string;
  label: string;
};

const MAX_TILT = 7;

export function UserFlowCard({ src, alt, label }: UserFlowCardProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [motionReduced, setMotionReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setMotionReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (motionReduced) return;

      const surface = surfaceRef.current;
      if (!surface) return;

      const rect = surface.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({
        rotateX: -y * MAX_TILT * 2,
        rotateY: x * MAX_TILT * 2,
      });
    },
    [motionReduced]
  );

  const resetTilt = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const tooltip =
    hovering &&
    createPortal(
      <span
        className="hover-tooltip"
        style={{ left: mousePos.x + 18, top: mousePos.y + 18 }}
      >
        {label}
      </span>,
      document.body
    );

  return (
    <div
      className="user-flow-card"
      onPointerEnter={(e) => {
        setHovering(true);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setHovering(false);
        resetTilt();
      }}
    >
      <div
        ref={surfaceRef}
        className="user-flow-card__surface"
        style={
          motionReduced
            ? undefined
            : {
                transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
              }
        }
      >
        <img src={src} alt={alt} draggable={false} />
      </div>
      {tooltip}
    </div>
  );
}
