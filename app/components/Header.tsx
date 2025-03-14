export default function Header() {
  return (
    <div className="flex items-center justify-center gap-3 p-4 sm:p-8">
      <svg
        className="w-20 h-20 sm:w-14 sm:h-14 text-purple-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L4 6V12M12 2L20 6V12M12 2V8M4 12L12 16M4 12V18L12 22M12 16L20 12M12 16V22M20 12V18L12 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
        <path
          d="M15 9L9 15M9 9L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-300"
        />
      </svg>
      <h1 className="font-audiowide text-3xl sm:text-5xl md:text-center text-left bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Extreme Sports Gallery
      </h1>
    </div>
  );
}
