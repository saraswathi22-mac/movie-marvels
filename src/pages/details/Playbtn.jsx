export const PlayIcon = ({
  size = 80,
  color = "#ffffff",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 213.7 213.7"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Play video"
      className={className}
    >
      <polygon
        className="triangle"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="73.5,62.5 148.5,105.8 73.5,149.1"
      />

      <circle
        className="circle"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        cx="106.8"
        cy="106.8"
        r="103.3"
      />
    </svg>
  );
};