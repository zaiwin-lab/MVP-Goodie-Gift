/* Inline icon set — no icon library, no network request, fully themeable. */

export type IconName =
  | "building"
  | "briefcase"
  | "mic"
  | "users"
  | "star"
  | "leaf"
  | "cap"
  | "book"
  | "sparkle"
  | "flag"
  | "globe"
  | "heart"
  | "heart-fill"
  | "arrow-right"
  | "arrow-up"
  | "check"
  | "close"
  | "paperclip"
  | "link"
  | "dice"
  | "copy"
  | "share"
  | "refresh"
  | "chevron-down"
  | "plus"
  | "shield";

const PATHS: Record<IconName, string> = {
  building: "M4 21h16M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11M9 8h2M9 12h2M9 16h2",
  briefcase: "M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8ZM9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M3 13h18",
  mic: "M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3ZM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6",
  users:
    "M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 20v-1.5a4 4 0 0 0-3-3.87M16 4.13a4 4 0 0 1 0 7.75",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z",
  leaf: "M20 4c0 9-5.5 14-13 14H4c0-8 5-13 12-13h4ZM4 20c2.5-5 6-8 11-10",
  cap: "M2 8.5 12 4l10 4.5-10 4.5L2 8.5ZM6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5M20 9.5V15",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5ZM6 17h13",
  sparkle:
    "M12 3v5M12 16v5M4.5 12h5M14.5 12h5M6.6 6.6l2.8 2.8M14.6 14.6l2.8 2.8M17.4 6.6l-2.8 2.8M9.4 14.6l-2.8 2.8",
  flag: "M5 21V4M5 5h11l-1.5 3L16 11H5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 9h17M3.5 15h17M12 3c2.5 2.5 3.5 5.6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.6-3.5-9S9.5 5.5 12 3Z",
  heart: "M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z",
  "heart-fill":
    "M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z",
  "arrow-right": "M4 12h15M13 6l6 6-6 6",
  "arrow-up": "M12 20V5M6 11l6-6 6 6",
  check: "m4 12.5 5 5L20 6.5",
  close: "M6 6l12 12M18 6 6 18",
  paperclip: "M20 11.5 12 19.5a4.5 4.5 0 0 1-6.4-6.4l8.5-8.5a3 3 0 0 1 4.2 4.2l-8.4 8.5a1.5 1.5 0 0 1-2.1-2.1l7.7-7.7",
  link: "M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5M14 11a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 19.7l1.5-1.5",
  dice: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13ZM8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01",
  copy: "M9 9V5.5A1.5 1.5 0 0 1 10.5 4h8A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H15M5.5 9h8A1.5 1.5 0 0 1 15 10.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 18.5v-8A1.5 1.5 0 0 1 5.5 9Z",
  share: "M12 3v13M8 7l4-4 4 4M5 14v5.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V14",
  refresh: "M20 11A8 8 0 0 0 6.3 6.3L4 8.5M4 13a8 8 0 0 0 13.7 4.7L20 15.5M4 4v4.5h4.5M20 20v-4.5h-4.5",
  "chevron-down": "m6 9 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  shield: "M12 3l8 3v6c0 4.4-3.2 8.2-8 9-4.8-.8-8-4.6-8-9V6l8-3ZM9 12l2 2 4-4",
};

interface Props {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 18, className, strokeWidth = 1.6 }: Props) {
  const filled = name === "heart-fill" || name === "star";
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
