import { useState } from "react";
import { usePointerDrag } from "../hooks/usePointerDrag";
import "./FunInstagramReelsStack.css";

export type InstagramReelImage = {
  src: string;
  alt: string;
};

type FunInstagramReelsStackProps = {
  id: string;
  images: InstagramReelImage[];
  caption: string;
  initialX: number;
  initialY: number;
  width: number;
  position: { x: number; y: number };
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
  zIndex: number;
};

export function FunInstagramReelsStack({
  id,
  images,
  caption,
  initialX,
  initialY,
  width,
  position,
  onPositionChange,
  onFocus,
  zIndex,
}: FunInstagramReelsStackProps) {
  const [localZ, setLocalZ] = useState(0);

  const { dragging, dragHandlers } = usePointerDrag({
    position,
    onPositionChange: (next) => onPositionChange(id, next),
    onDragStart: () => {
      onFocus(id);
      setLocalZ(50);
    },
    onDragEnd: () => setLocalZ(0),
  });

  const [leftCard, rightCard] = images;

  return (
    <div
      className={`fun-ig-stack${dragging ? " fun-ig-stack--dragging" : ""}`}
      style={{
        transform: `translate(calc(-50% + ${initialX + position.x}px), calc(-50% + ${initialY + position.y}px))`,
        zIndex: zIndex + localZ,
        width,
      }}
      {...dragHandlers}
    >
      <div
        className={`fun-ig-stack__cards${dragging ? " fun-ig-stack__cards--dragging" : ""}`}
      >
        {leftCard ? (
          <div className="fun-ig-stack__card fun-ig-stack__card--left">
            <img src={leftCard.src} alt={leftCard.alt} draggable={false} />
          </div>
        ) : null}
        {rightCard ? (
          <div className="fun-ig-stack__card fun-ig-stack__card--right">
            <img src={rightCard.src} alt={rightCard.alt} draggable={false} />
          </div>
        ) : null}
      </div>
      <p className="fun-ig-stack__caption">{caption}</p>
    </div>
  );
}
