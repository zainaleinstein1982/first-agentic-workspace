import React from 'react';
import { 
  Star, 
  ChevronLeft, 
  Circle, 
  Triangle, 
  Square, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo
} from 'lucide-react';

// Data milestone galangan kapal sesuai diagram
const milestoneData = [
  {
    id: 'edc',
    code: 'EDC',
    label: 'EDC - Effective...',
    year: '2026',
    icon: Star,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400',
    position: '18%', // Posisi horizontal garis
  },
  {
    id: 'fsc',
    code: 'FSC',
    label: 'FSC - First Ste...',
    year: '2027',
    icon: ChevronLeft,
    color: 'text-slate-400',
    bgColor: 'bg-slate-400',
    position: '42%',
  },
  {
    id: 'kl',
    code: 'KL',
    label: 'KL - Keel Laying',
    year: '2027',
    icon: Circle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    position: '54%',
  },
  {
    id: 'l',
    code: 'L (Launching)',
    label: 'L - Launching',
    year: '2027',
    icon: Triangle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600',
    position: '70%',
    rotateIcon: 'rotate-180', // Segitiga mengarah ke bawah
  },
  {
    id: 'hat',
    code: 'HAT & SAT',
    label: 'HAT & SAT - Har...',
    year: '2028',
    icon: Square,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    position: '82%',
  },
  {
    id: 'd',
    code: 'D (Delivery)',
    label: 'D - Delivery',
    year: '2028',
    icon: Star,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    position: '92%',
  },
];

export const MilestoneDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-5 p-2 font-sans text-slate-100">
      
      {/* 1. KARTU UTAMA: DIAGRAM MILESTONE SBLC */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-6 shadow-xl backdrop-blur-md">
        
        {/* Header Diagram */}
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Diagram Milestone SBLC
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Otomatis dari tugas yang punya field <strong className="text-slate-300">Epic</strong> (nama proyek) dan <strong className="text-slate-300">Tanggal mulai</strong> — tambahkan proyek/milestone baru di Board/List, diagram ini akan ikut bertambah.
          </p>
        </div>

        {/* Area Timeline Visual */}
        <div className="relative my-10 px-4 py-8">
          
          {/* Label Tahun (Header Timeline) */}
          <div className="absolute -top-6 w-full flex justify-between text-xs font-semibold text-slate-400 border-b border-dashed border-slate-800/40 pb-2">
            <span className="ml-[16%]">2026</span>
            <span className="ml-[10%]">2027</span>
            <span className="mr-[8%]">2028</span>
          </div>

          {/* Label Proyek Utama di Sisi Kiri */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 font-extrabold text-sm text-slate-200 tracking-wider">
            SBLC 2026
          </div>

          {/* Garis Dasar Timeline (Dotted Line) */}
          <div className="ml-28 relative h-10 flex items-center">
            <div className="w-full border-b-2 border-dotted border-slate-600/60" />

            {/* Garis Pembatas Tahun (Vertical Separator) */}
            <div className="absolute left-[38%] top-0 bottom-0 border-l border-dashed border-slate-600/50" />

            {/* Iterasi Milestone Marker */}
            {milestoneData.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="absolute flex flex-col items-center -translate-x-1/2 group cursor-pointer"
                  style={{ left: item.position }}
                >
                  {/* Label Teks di Atas Pin */}
                  <span className="text-[11px] font-mono text-slate-300 mb-2 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>

                  {/* Icon Node Visual */}
                  <div className="bg-slate-950 p-1 rounded-full z-10 transition-transform group-hover:scale-125">
                    <IconComponent 
                      size={14} 
                      className={`${item.color} fill-current ${item.rotateIcon || ''}`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend / Keterangan Simbol Milestone */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/60 text-xs text-slate-300 ml-28">
          {milestoneData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-2">
                <IconComponent 
                  size={13} 
                  className={`${item.color} fill-current ${item.rotateIcon || ''}`} 
                />
                <span className="font-mono text-[11px]">{item.code}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* 2. GRID KARTU STATISTIK TUGAS (4 COLUMN METRICS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Completed Tasks */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Completed Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">
            3
          </div>
        </div>

        {/* Incomplete Tasks */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Incomplete Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">
            3
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Overdue Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">
            0
          </div>
        </div>

        {/* Total Tasks */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Total Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">
            6
          </div>
        </div>

      </div>

    </div>
  );
};
