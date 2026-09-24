"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, ChevronDown } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Duration") return a.duration - b.duration;
    if (sortBy === "Calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-24">
        <div className="md:w-1/2 space-y-6">
          <p className="text-[#ccff00] font-bold tracking-widest text-sm">WORKOUT LIBRARY</p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase leading-tight font-oswald">
            Train with intent.<br />Log every set.
          </h1>
          <p className="text-gray-400 text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a href="#library" className="inline-flex items-center gap-2 px-6 py-3 bg-[#ccff00] text-black font-bold rounded-md hover:bg-yellow-400 transition">
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <Image src="/banner.png" alt="Hero Banner" width={500} height={500} className="object-contain" />
        </div>
      </div>

      {/* library Section */}
      <div id="library" className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold uppercase">The Library</h2>
            <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="relative">
            <select 
              className="appearance-none bg-[#1a1a1a] border border-gray-700 text-white py-2 pl-4 pr-10 rounded-md focus:outline-none focus:border-[#ccff00]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Duration">Sort By: Duration</option>
              <option value="Calories">Sort By: Calories</option>
              <option value="Rating">Sort By: Rating</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-[#ccff00]">Loading workouts...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link href={`/workout/${workout.id}`} key={workout.id}>
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-[#ccff00] transition cursor-pointer group">
                  <div className="h-56 overflow-hidden bg-gray-900">
                    <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex gap-2">
                      {workout.muscleGroups.map((tag: string) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider bg-gray-800 px-2 py-1 rounded text-gray-300">{tag}</span>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase">{workout.name}</h3>
                      <p className="text-sm text-gray-500">{workout.equipment}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400 pt-2 border-t border-gray-800">
                      <div className="flex items-center gap-1"><Clock size={16} className="text-[#ccff00]"/> {workout.duration} min</div>
                      <div className="flex items-center gap-1"><Flame size={16} className="text-[#ccff00]"/> {workout.caloriesBurned} kcal</div>
                      <div className="flex items-center gap-1"><Star size={16} className="text-[#ccff00]"/> {workout.rating}</div>
                    </div>
                  </div>                  
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}