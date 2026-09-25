import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 p-8 flex justify-between items-center mt-20">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="FitLog Logo" width={24} height={24} />
        <span className="font-bold uppercase tracking-widest text-white">FitLog</span>
      </div>
      <p className="text-gray-500 text-sm">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}