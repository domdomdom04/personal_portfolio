import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContactLinks } from "../components/ContactLinks";
import { ThemeToggle } from "../components/ThemeToggle";
import { LocationBadge } from "../components/LocationBadge";
import { WeatherWidget } from "../components/WeatherWidget";
import { BottomNav } from "../components/BottomNav";
import { FunPlaygroundItem } from "../components/FunPlaygroundItem";
import { FunInstagramReelsStack } from "../components/FunInstagramReelsStack";
import {
  FUN_HERO,
  FUN_INSTAGRAM_STACK,
  FUN_STATIC_ITEMS,
  YOUTUBE_ITEM_LAYOUTS,
  type FunItem,
} from "../data/funItems";
import { pickRandomVideos, youtubeThumbnailUrl, type YoutubeVideo } from "../data/youtubeVideos";
import "./Fun.css";

type Position = { x: number; y: number };
type ItemPositions = Record<string, Position>;

function StarIcon() {
  return (
    <svg
      className="fun-hero__icon"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5 14.2 9l5.8.5-4.4 3.8 1.3 5.7L12 16.8 7.1 19l1.3-5.7L4 9.5l5.8-.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildYoutubeItems(videos: YoutubeVideo[]): FunItem[] {
  return videos.map((video, index) => {
    const layout = YOUTUBE_ITEM_LAYOUTS[index] ?? YOUTUBE_ITEM_LAYOUTS[0];
    return {
      id: `yt-${video.id}`,
      type: "youtube" as const,
      imageSrc: youtubeThumbnailUrl(video.id),
      imageAlt: video.title,
      caption: video.title,
      href: `https://www.youtube.com/watch?v=${video.id}`,
      initialX: layout.initialX,
      initialY: layout.initialY,
      width: layout.width,
    };
  });
}

function getViewportSpread() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const xSpread = w < 768 ? 0.82 : Math.min(1.08, w / 1280);
  const ySpread = Math.min(1, h / 760);
  return { xSpread, ySpread };
}

function scaleItems(items: FunItem[]): FunItem[] {
  const { xSpread, ySpread } = getViewportSpread();
  const widthScale = window.innerWidth < 768 ? 0.78 : 1;

  return items.map((item) => ({
    ...item,
    initialX: Math.round(item.initialX * xSpread),
    initialY: Math.round(item.initialY * ySpread),
    width: Math.round(item.width * widthScale),
  }));
}

function scaleInstagramStack() {
  const { xSpread, ySpread } = getViewportSpread();
  const widthScale = window.innerWidth < 768 ? 0.78 : 1;

  return {
    ...FUN_INSTAGRAM_STACK,
    images: [...FUN_INSTAGRAM_STACK.images],
    initialX: Math.round(FUN_INSTAGRAM_STACK.initialX * xSpread),
    initialY: Math.round(FUN_INSTAGRAM_STACK.initialY * ySpread),
    width: Math.round(FUN_INSTAGRAM_STACK.width * widthScale),
  };
}

function defaultPositions(items: FunItem[]): ItemPositions {
  return {
    [FUN_INSTAGRAM_STACK.id]: { x: 0, y: 0 },
    ...Object.fromEntries(items.map((item) => [item.id, { x: 0, y: 0 }])),
  };
}

export function Fun() {
  const [randomVideos] = useState<YoutubeVideo[]>(() => pickRandomVideos(3));
  const youtubeItems = useMemo(() => buildYoutubeItems(randomVideos), [randomVideos]);

  const [instagramStack, setInstagramStack] = useState(() => scaleInstagramStack());

  const [layoutItems, setLayoutItems] = useState(() =>
    scaleItems([...youtubeItems, ...FUN_STATIC_ITEMS])
  );

  const [pan, setPan] = useState<Position>({ x: 0, y: 0 });
  const [itemPositions, setItemPositions] = useState<ItemPositions>(() =>
    defaultPositions([...youtubeItems, ...FUN_STATIC_ITEMS])
  );
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [panning, setPanning] = useState(false);
  const panRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(
    null
  );

  const handleItemPositionChange = useCallback((id: string, position: Position) => {
    setItemPositions((prev) => ({ ...prev, [id]: position }));
  }, []);

  const handlePanPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      panRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: pan.x,
        originY: pan.y,
      };
      setPanning(true);
    },
    [pan.x, pan.y]
  );

  const handlePanPointerMove = useCallback((e: React.PointerEvent) => {
    if (!panRef.current) return;
    const dx = e.clientX - panRef.current.startX;
    const dy = e.clientY - panRef.current.startY;
    setPan({
      x: panRef.current.originX + dx,
      y: panRef.current.originY + dy,
    });
  }, []);

  const handlePanPointerUp = useCallback((e: React.PointerEvent) => {
    if (!panRef.current) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    panRef.current = null;
    setPanning(false);
  }, []);

  useEffect(() => {
    localStorage.removeItem("fun-playground-state");
    const onResize = () => {
      setInstagramStack(scaleInstagramStack());
      setLayoutItems(scaleItems([...youtubeItems, ...FUN_STATIC_ITEMS]));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [youtubeItems]);

  return (
    <div className="fun-page">
      <div className="fun-back-layer" aria-hidden={false}>
        <div className="fun-hero">
          <StarIcon />
          <h1 className="fun-hero__title">{FUN_HERO.title}</h1>
          <p className="fun-hero__subtitle">{FUN_HERO.subtitle}</p>
        </div>

        <footer className="fun-page__corners">
          <LocationBadge />
          <WeatherWidget />
        </footer>
      </div>

      <header className="fun-chrome-layer fun-page__header">
        <ContactLinks />
        <ThemeToggle />
      </header>

      <div
        className={`fun-pan-layer${panning ? " fun-pan-layer--panning" : ""}`}
        onPointerDown={handlePanPointerDown}
        onPointerMove={handlePanPointerMove}
        onPointerUp={handlePanPointerUp}
        onPointerCancel={handlePanPointerUp}
      />

      <div className="fun-canvas-layer">
        <div className="fun-canvas" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
          <FunInstagramReelsStack
            id={instagramStack.id}
            images={instagramStack.images}
            caption={instagramStack.caption}
            initialX={instagramStack.initialX}
            initialY={instagramStack.initialY}
            width={instagramStack.width}
            position={itemPositions[instagramStack.id] ?? { x: 0, y: 0 }}
            onPositionChange={handleItemPositionChange}
            onFocus={setFocusedId}
            zIndex={focusedId === instagramStack.id ? 20 : 14}
          />

          {layoutItems.map((item, index) => (
            <FunPlaygroundItem
              key={item.id}
              item={item}
              position={itemPositions[item.id] ?? { x: 0, y: 0 }}
              onPositionChange={handleItemPositionChange}
              onFocus={setFocusedId}
              zIndex={focusedId === item.id ? 20 : 10 + index}
            />
          ))}
        </div>
      </div>

      <a
        className="fun-hero__link"
        href={FUN_HERO.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        @jdddominique on YouTube ({FUN_HERO.youtubeSubscribers} subscribers)
      </a>

      <div className="fun-nav-layer">
        <BottomNav />
      </div>
    </div>
  );
}
