"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { planned, saved } = useWorkout();

  return (
    <nav className="flex justify-between items-center p-6 bg-[#111] border-b border-gray-800">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="FitLog Logo" width={30} height={30} />
        <span className="font-bold text-xl uppercase tracking-widest text-white">FitLog</span>
      </div>
      
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className={pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}>
          Workout
        </Link>
        <Link href="/my-plan" className={pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}>
          My Plan
        </Link>
      </div>

      <div className="flex gap-4">
        <Link href="/my-plan" className="px-4 py-1.5 bg-[#ccff00] text-black font-bold rounded-full text-xs">
          Plan {planned.length}
        </Link>
        <Link href="/my-plan" className="px-4 py-1.5 border border-gray-500 text-gray-300 font-bold rounded-full text-xs">
          Saved {saved.length}
        </Link>
      </div>
    </nav>
  );
}