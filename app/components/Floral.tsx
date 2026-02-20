export function Floral() {
  return (
    <div className="flex justify-center my-12 opacity-80">
      <svg
        width="180"
        height="60"
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-accent"
      >
        <path
          d="M10 40 C40 10, 160 10, 190 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="25" r="3" fill="currentColor" />
        <circle cx="160" cy="25" r="3" fill="currentColor" />
        <circle cx="100" cy="18" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
