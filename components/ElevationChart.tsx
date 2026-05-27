"use client";

import type { GpxProfilePoint } from "@/lib/parseGpx";

type Props = {
  profile: GpxProfilePoint[];
  km: number;
  vm: number;
  minEle: number;
  maxEle: number;
};

export default function ElevationChart({ profile, km, vm, minEle, maxEle }: Props) {
  if (profile.length < 2) return null;

  const W = 800;
  const H = 160;
  const PAD = { top: 16, right: 16, bottom: 32, left: 52 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const eleRange = maxEle - minEle || 1;
  const totalKm = profile[profile.length - 1].dist || km || 1;

  const x = (dist: number) => PAD.left + (dist / totalKm) * chartW;
  const y = (ele: number) => PAD.top + chartH - ((ele - minEle) / eleRange) * chartH;

  // Build SVG path
  const points = profile.map((p) => `${x(p.dist).toFixed(1)},${y(p.ele).toFixed(1)}`);
  const linePath = `M ${points.join(" L ")}`;
  const fillPath = `${linePath} L ${x(totalKm).toFixed(1)},${(PAD.top + chartH).toFixed(1)} L ${PAD.left},${(PAD.top + chartH).toFixed(1)} Z`;

  // X axis ticks — every ~10 km, max 8 ticks
  const tickCount = Math.min(8, Math.floor(totalKm / 10) + 1);
  const tickInterval = totalKm / tickCount;
  const xTicks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.min(i * tickInterval, totalKm)
  );

  // Y axis ticks — 3 lines
  const yTicks = [minEle, Math.round((minEle + maxEle) / 2), maxEle];

  const gradId = "elev-grad";

  return (
    <div className="rounded-[20px] border border-white/10 bg-[#07110b] p-5">
      {/* Header stats */}
      <div className="mb-4 flex flex-wrap gap-5">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">Skupni vzpon</div>
          <div className="mt-1 text-xl font-black text-[#f4d7ad]">{vm} <span className="text-sm font-normal text-zinc-400">vm</span></div>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">Najvišja točka</div>
          <div className="mt-1 text-xl font-black text-[#f4d7ad]">{maxEle} <span className="text-sm font-normal text-zinc-400">m</span></div>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">Najnižja točka</div>
          <div className="mt-1 text-xl font-black text-[#f4d7ad]">{minEle} <span className="text-sm font-normal text-zinc-400">m</span></div>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">Skupna razlika</div>
          <div className="mt-1 text-xl font-black text-[#f4d7ad]">{maxEle - minEle} <span className="text-sm font-normal text-zinc-400">m</span></div>
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c58b46" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c58b46" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Y grid lines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left} y1={y(tick)}
              x2={PAD.left + chartW} y2={y(tick)}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1"
            />
            <text
              x={PAD.left - 8} y={y(tick)}
              textAnchor="end" dominantBaseline="middle"
              fontSize="10" fill="rgba(255,255,255,0.3)" fontFamily="monospace"
            >
              {tick}m
            </text>
          </g>
        ))}

        {/* Filled area */}
        <path d={fillPath} fill={`url(#${gradId})`} />

        {/* Line */}
        <path d={linePath} fill="none" stroke="#c58b46" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Start dot */}
        <circle
          cx={x(profile[0].dist)} cy={y(profile[0].ele)}
          r="4" fill="#22c55e" stroke="#07110b" strokeWidth="1.5"
        />

        {/* End dot */}
        <circle
          cx={x(profile[profile.length - 1].dist)} cy={y(profile[profile.length - 1].ele)}
          r="4" fill="#c58b46" stroke="#07110b" strokeWidth="1.5"
        />

        {/* X axis ticks */}
        {xTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={x(tick)} y1={PAD.top + chartH}
              x2={x(tick)} y2={PAD.top + chartH + 4}
              stroke="rgba(255,255,255,0.2)" strokeWidth="1"
            />
            <text
              x={x(tick)} y={PAD.top + chartH + 14}
              textAnchor="middle" fontSize="10"
              fill="rgba(255,255,255,0.3)" fontFamily="monospace"
            >
              {tick.toFixed(0)}km
            </text>
          </g>
        ))}

        {/* Bottom border */}
        <line
          x1={PAD.left} y1={PAD.top + chartH}
          x2={PAD.left + chartW} y2={PAD.top + chartH}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        />
      </svg>
    </div>
  );
}
