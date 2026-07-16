interface SectionDividerProps {
  from?: string;
  to?: string;
  direction?: "left" | "right";
  height?: number;
  className?: string;
}

export default function SectionDivider({
  from = "#FFFFFF",
  to = "#0A0A0A",
  direction = "right",
  height = 80,
  className = "",
}: SectionDividerProps) {
  const points =
    direction === "right"
      ? "0,0 100,0 100,100 0,40"
      : "0,0 100,0 100,40 0,100";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px`, marginTop: -1, marginBottom: -1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Background fill */}
        <rect width="100" height="100" fill={to} />
        {/* Angled shape from previous section */}
        <polygon points={points} fill={from} />
      </svg>
    </div>
  );
}
