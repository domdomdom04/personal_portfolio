import "./ArchedGreeting.css";

const BIO_LINES = [
  "designing products and moments worth keeping.",
  "learning as I go. sometimes with a camera.",
  "always with coffee.",
];

const ARCH_TEXT = "hi there ~ i'm janna";

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function buildWavyLetters(text: string) {
  const chars = text.split("");
  const count = chars.length;
  const width = 240;
  const startX = 10;
  const span = width - 20;

  const y0 = 32;
  const y1 = 16;
  const y2 = 40;
  const y3 = 30;

  return chars.map((char, index) => {
    const t = count === 1 ? 0 : index / (count - 1);
    const x = startX + t * span;
    const y = cubicBezier(t, y0, y1, y2, y3);

    const dt = 0.015;
    const t2 = Math.min(t + dt, 1);
    const t1 = Math.max(t - dt, 0);
    const x2 = startX + t2 * span;
    const y2p = cubicBezier(t2, y0, y1, y2, y3);
    const x1 = startX + t1 * span;
    const y1p = cubicBezier(t1, y0, y1, y2, y3);
    const tangent = (Math.atan2(y2p - y1p, x2 - x1) * 180) / Math.PI;
    const rotation = tangent * 0.35;

    return {
      char: char === " " ? "\u00a0" : char,
      x,
      y,
      rotation,
      key: `${char}-${index}`,
    };
  });
}

const WAVY_LETTERS = buildWavyLetters(ARCH_TEXT);

export function ArchedGreeting() {
  return (
    <div className="arched-greeting">
      <div className="arched-greeting__wave" aria-label={ARCH_TEXT}>
        {WAVY_LETTERS.map(({ char, x, y, rotation, key }, index) => (
          <span
            key={key}
            className="arched-greeting__letter"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              ["--letter-i" as string]: index,
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
      </div>
      <div className="arched-greeting__bio">
        {BIO_LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
