import Link from "next/link";

export function Actions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/contact"
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        Me contacter
      </Link>
      <Link
        href="#"
        className="px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-2"
        download="CV_Gilchrist.pdf"
      >
        <span>Télécharger mon CV</span>
        <svg
          className="w-4 h-4"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5 20h14v-2H5v2zM12 2l-5 5h3v6h4V7h3l-5-5z" />
        </svg>
      </Link>
    </div>
  );
}