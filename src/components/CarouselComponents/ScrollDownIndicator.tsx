import Link from "next/link";

export default function ScrollDownIndicator() {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
      <Link href="#" className="animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </Link>
    </div>
  );
}
