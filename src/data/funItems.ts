export type FunItemType = "youtube" | "instagram" | "photo";

export type FunItem = {
  id: string;
  type: FunItemType;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt: string;
  caption: string;
  href?: string;
  initialX: number;
  initialY: number;
  width: number;
};

export const FUN_HERO = {
  title: "Off the clock",
  subtitle: "YouTube vlogs, Instagram reels, and other random explorations",
  youtubeUrl: "https://www.youtube.com/@jdddominique",
  youtubeSubscribers: "17.7k",
};

/** Clustered on the left — offsets are multiplied by viewport spread in Fun.tsx */
export const YOUTUBE_ITEM_LAYOUTS = [
  { initialX: -360, initialY: -160, width: 200 },
  { initialX: -295, initialY: 30, width: 185 },
  { initialX: -385, initialY: 240, width: 175 },
] as const;

export const FUN_INSTAGRAM_STACK = {
  id: "instagram-reels",
  caption: "Short-form reels on Instagram — GRWMs, day-in-my-life clips & more",
  images: [
    {
      src: "/images/fun/instagram-reel-2.png",
      alt: "Instagram reel — Victoria Sushi pop-up",
    },
    {
      src: "/images/fun/instagram-reel-1.png",
      alt: "Instagram reel — JudyDoll product unboxing",
    },
  ],
  initialX: 355,
  initialY: -150,
  width: 200,
} as const;

export const FUN_STATIC_ITEMS: FunItem[] = [
  {
    id: "filming",
    type: "photo",
    imageSrc: "/images/fun/filming-placeholder.svg",
    imageAlt: "Behind the scenes filming",
    caption: "Usually behind the camera (or awkwardly in front of it)",
    initialX: 365,
    initialY: 240,
    width: 175,
  },
];
