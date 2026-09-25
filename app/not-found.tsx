import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-9xl font-bold text-[#ccff00]">404</h1>
      <h2 className="text-3xl font-bold uppercase">Page Not Found</h2>
      <p className="text-gray-400">The heavy lifting broke this link. Let's get you back to the gym.</p>
      <Link href="/" className="px-6 py-3 bg-[#ccff00] text-black font-bold rounded-md hover:bg-yellow-400">
        Back to Home
      </Link>
    </div>
  );
}