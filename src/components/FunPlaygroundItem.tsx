import { useCallback, useEffect, useRef, useState } from "react";
import type { FunItem } from "../data/funItems";
import { usePointerDrag } from "../hooks/usePointerDrag";
import "./FunPlaygroundItem.css";

type FunPlaygroundItemProps = {
  item: FunItem;
  position: { x: number; y: number };
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
  zIndex: number;
};

function InstagramReelPreview({ imageSrc, alt }: { imageSrc: string; alt: string }) {
  return (
    <div className="fun-item__instagram-video">
      <img className="fun-item__instagram-video-el" src={imageSrc} alt={alt} draggable={false} />
    </div>
  );
}

function InstagramReelPlayer({ videoSrc, alt }: { videoSrc: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      /* autoplay may be blocked until user interacts with the page */
    });
  }, []);

  return (
    <div className="fun-item__instagram-video">
      <video
        ref={videoRef}
        className="fun-item__instagram-video-el"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-label={alt}
      />
    </div>
  );
}

export function FunPlaygroundItem({
  item,
  position,
  onPositionChange,
  onFocus,
  zIndex,
}: FunPlaygroundItemProps) {
  const [localZ, setLocalZ] = useState(0);

  const handlePositionChange = useCallback(
    (next: { x: number; y: number }) => {
      onPositionChange(item.id, next);
    },
    [item.id, onPositionChange]
  );

  const { dragging, dragHandlers } = usePointerDrag({
    position,
    onPositionChange: handlePositionChange,
    onDragStart: () => {
      onFocus(item.id);
      setLocalZ(50);
    },
    onDragEnd: () => setLocalZ(0),
  });

  const content = (
    <>
      <div
        className={`fun-item__media fun-item__media--${item.type}${
          dragging ? " fun-item__media--dragging" : ""
        }`}
        style={{ width: item.width }}
      >
        {item.type === "instagram" && item.videoSrc ? (
          <InstagramReelPlayer videoSrc={item.videoSrc} alt={item.imageAlt} />
        ) : item.type === "instagram" && item.imageSrc ? (
          <InstagramReelPreview imageSrc={item.imageSrc} alt={item.imageAlt} />
        ) : item.imageSrc ? (
          <img src={item.imageSrc} alt={item.imageAlt} draggable={false} />
        ) : null}
      </div>
      <p className="fun-item__caption">{item.caption}</p>
    </>
  );

  return (
    <div
      className={`fun-item${dragging ? " fun-item--dragging" : ""}`}
      style={{
        transform: `translate(calc(-50% + ${item.initialX + position.x}px), calc(-50% + ${item.initialY + position.y}px))`,
        zIndex: zIndex + localZ,
      }}
      {...dragHandlers}
    >
      {item.href ? (
        <a
          className="fun-item__link"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => dragging && e.preventDefault()}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
