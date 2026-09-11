interface LoaderProps {
  label?: string;
  fullHeight?: boolean;
}

export default function Loader({ label = 'Loading…', fullHeight = true }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-slate-400 ${
        fullHeight ? 'min-h-[240px]' : 'py-8'
      }`}
      role="status"
      aria-live="polite"
    >
      <svg className="h-8 w-8 animate-spin text-brass-400" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}
