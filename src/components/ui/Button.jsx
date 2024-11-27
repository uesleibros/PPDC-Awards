import Link from "next/link";

export default function Button({ variant, url, content, onClick, className }) {
  const button = (
    <button
      className={`relative p-4 font-bold transition-colors ${
        variant
          ? "text-gray-900 bg-yellow-200 hover:bg-yellow-100"
          : "text-white bg-gray-900 hover:bg-gray-800"
      } ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );

  return url ? <Link href={url}>{button}</Link> : button;
}