import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

/** Animated numeric counter — counts up on mount / value change. */
export function CountUp({ value, duration = 900, className = '' }) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const to = Number(value) || 0;
    if (from === to) {
      setDisplay(to);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span className={`tabular-nums ${className}`}>{display.toLocaleString()}</span>;
}

/** Smooth-area SVG line chart. `data` = array of numbers. */
export function MiniLineChart({ data, height = 120, stroke = '#5FB032', className = '' }) {
  const { isLight } = useTheme();
  const w = 320;
  const h = 100;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const stepX = w / (data.length - 1 || 1);

  const points = data.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 14) - 7]);
  const pathD = points.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = points[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, '');
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  const gradId = `lc-${stroke.replace('#', '')}`;
  const gridColor = isLight ? 'rgba(46,90,28,0.12)' : 'rgba(255,255,255,0.08)';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ height }} className={`w-full ${className}`} preserveAspectRatio="none" role="img" aria-label="Trend line chart">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.45" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke={gridColor} strokeWidth="1" strokeDasharray="4 5" />
      ))}
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={pathD} fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="600" strokeDashoffset="600">
        <animate attributeName="stroke-dashoffset" from="600" to="0" dur="1.1s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" keyTimes="0;1" />
      </path>
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={stroke} opacity="0.9" />
      ))}
    </svg>
  );
}

/** Bar chart with grow animation. `data` = [{label, value}] */
export function MiniBarChart({ data, height = 130, color = '#5FB032', highlightLast = true }) {
  const { isLight } = useTheme();
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 sm:gap-2.5" style={{ height }} role="img" aria-label="Bar chart">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
          <span className={`text-[10px] font-bold tabular-nums ${isLight ? 'text-[#284224]' : 'text-white/70'}`}>
            {d.value}
          </span>
          <div
            className="w-full rounded-t-lg animate-bar-grow"
            style={{
              height: `${Math.max(8, (d.value / max) * (height - 42))}px`,
              background:
                highlightLast && i === data.length - 1
                  ? 'linear-gradient(180deg,#CABA3A,#8a7b10)'
                  : `linear-gradient(180deg,${color},${color}88)`,
              animationDelay: `${i * 60}ms`,
            }}
          />
          <span className={`text-[10px] font-semibold truncate w-full text-center ${isLight ? 'text-[#284224]/80' : 'text-white/60'}`}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Donut chart. `segments` = [{value, color, label}] */
export function DonutChart({ segments, size = 148, thickness = 20, centerLabel, centerValue }) {
  const { isLight } = useTheme();
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label="Donut chart">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={isLight ? 'rgba(46,90,28,0.12)' : 'rgba(255,255,255,0.08)'} strokeWidth={thickness} />
        {segments.map((seg, i) => {
          const frac = seg.value / total;
          const dash = frac * c;
          const offset = -acc * c;
          acc += frac;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(0, dash - 2)} ${c - Math.max(0, dash - 2)}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl sm:text-2xl font-extrabold tabular-nums">{centerValue}</span>
        <span className={`text-[10px] sm:text-xs font-semibold ${isLight ? 'text-[#284224]' : 'text-white/70'}`}>{centerLabel}</span>
      </div>
    </div>
  );
}
