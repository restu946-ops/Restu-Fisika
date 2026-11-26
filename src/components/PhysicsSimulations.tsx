import {useEffect, useRef, useState} from 'react';
import {Pause, Play, RotateCcw, Calculator} from 'lucide-react';
import {MathFormula} from './MathFormula';

function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  color: string,
  label: string,
  labelOffsetX = 0,
  labelOffsetY = 0,
) {
  const headlen = 9;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const length = Math.hypot(dx, dy);
  if (length < 4) return;
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(label, toX + labelOffsetX, toY + labelOffsetY);
  ctx.restore();
}

export function GmbCanvasSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [radiusM, setRadiusM] = useState(1.0);
  const [freqHz, setFreqHz] = useState(0.4);
  const [ccw, setCcw] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showV, setShowV] = useState(true);
  const [showAs, setShowAs] = useState(true);
  const [angleRad, setAngleRad] = useState(0);

  const stateRef = useRef({radiusM, freqHz, ccw, playing, showV, showAs});
  stateRef.current = {radiusM, freqHz, ccw, playing, showV, showAs};

  const angleRef = useRef(0);

  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();

    const renderFrame = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const s = stateRef.current;
      const omega = 2 * Math.PI * s.freqHz;
      if (s.playing) {
        angleRef.current += (s.ccw ? 1 : -1) * omega * dt;
        setAngleRad(angleRef.current);
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          const cx = w / 2;
          const cy = h / 2;

          ctx.clearRect(0, 0, w, h);

          // Grid backdrop
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          for (let gx = 30; gx < w; gx += 30) {
            ctx.beginPath();
            ctx.moveTo(gx, 0);
            ctx.lineTo(gx, h);
            ctx.stroke();
          }
          for (let gy = 30; gy < h; gy += 30) {
            ctx.beginPath();
            ctx.moveTo(0, gy);
            ctx.lineTo(w, gy);
            ctx.stroke();
          }

          // Axes
          ctx.strokeStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.moveTo(cx, 12);
          ctx.lineTo(cx, h - 12);
          ctx.moveTo(12, cy);
          ctx.lineTo(w - 12, cy);
          ctx.stroke();

          // Visual radius mapped from 0.2..2.0 m to 36..135 px
          const rPx = 36 + ((s.radiusM - 0.2) / 1.8) * 99;

          // Circular orbit
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 5]);
          ctx.beginPath();
          ctx.arc(cx, cy, rPx, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Angle sweep sector (visual mod 2pi)
          const theta = angleRef.current;
          // Screen Y is down, so mathematical CCW is -theta in canvas
          const canvasAngle = -theta;
          ctx.fillStyle = 'rgba(14, 165, 233, 0.12)';
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, Math.min(36, rPx * 0.6), 0, canvasAngle, s.ccw);
          ctx.closePath();
          ctx.fill();

          const px = cx + rPx * Math.cos(canvasAngle);
          const py = cy + rPx * Math.sin(canvasAngle);

          // Radius line
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Center pivot
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(cx, cy, 5, 0, Math.PI * 2);
          ctx.fill();

          // Tangential velocity vector
          const vMag = omega * s.radiusM;
          if (s.showV) {
            const tangentAngle = canvasAngle + (s.ccw ? -Math.PI / 2 : Math.PI / 2);
            const vLen = Math.min(72, Math.max(24, vMag * 12));
            drawArrow(
              ctx,
              px,
              py,
              px + vLen * Math.cos(tangentAngle),
              py + vLen * Math.sin(tangentAngle),
              '#0284c7',
              'v',
              6,
              -4,
            );
          }

          // Centripetal acceleration vector (towards center)
          if (s.showAs) {
            const asMag = omega * omega * s.radiusM;
            const asLen = Math.min(rPx - 10, Math.max(20, asMag * 4));
            const inwardAngle = canvasAngle + Math.PI;
            drawArrow(
              ctx,
              px,
              py,
              px + asLen * Math.cos(inwardAngle),
              py + asLen * Math.sin(inwardAngle),
              '#ea580c',
              'aₛ',
              6,
              12,
            );
          }

          // Moving particle
          const grad = ctx.createRadialGradient(px - 3, py - 3, 2, px, py, 11);
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(1, '#0369a1');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  const period = 1 / freqHz;
  const omega = 2 * Math.PI * freqHz;
  const linearV = omega * radiusM;
  const accelS = omega * omega * radiusM;
  const absDeg = Math.abs((angleRad * 180) / Math.PI) % 360;

  return (
    <div className="card-3d-surface rounded-3xl p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Simulasi Interaktif Gerak Melingkar Beraturan (GMB)
          </h3>
          <p className="text-sm text-slate-600">
            Ubah jari-jari dan frekuensi untuk mengamati perubahan vektor kecepatan tangensial dan percepatan sentripetal.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{playing ? 'Jeda' : 'Putar'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              angleRef.current = 0;
              setAngleRad(0);
            }}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Interactive Canvas Stage */}
        <div className="lg:col-span-7 flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <canvas
            ref={canvasRef}
            width={460}
            height={340}
            className="w-full max-w-[460px] rounded-xl bg-white"
            aria-label="Kanvas simulasi Gerak Melingkar Beraturan"
          />
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="inline-block h-2.5 w-5 rounded-sm bg-sky-600" />
              Vektor Kecepatan Linear (v)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="inline-block h-2.5 w-5 rounded-sm bg-orange-600" />
              Percepatan Sentripetal (aₛ)
            </span>
          </div>
        </div>

        {/* Control & Telemetry Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="gmb-radius">Jari-jari Lintasan (r)</label>
                <span className="font-mono-tabular text-sky-700">{radiusM.toFixed(2)} m</span>
              </div>
              <input
                id="gmb-radius"
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={radiusM}
                onChange={(e) => setRadiusM(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="gmb-freq">Frekuensi Putaran (f)</label>
                <span className="font-mono-tabular text-sky-700">{freqHz.toFixed(2)} Hz</span>
              </div>
              <input
                id="gmb-freq"
                type="range"
                min={0.1}
                max={1.5}
                step={0.05}
                value={freqHz}
                onChange={(e) => setFreqHz(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCcw(true)}
                className={`flex-1 min-h-9 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  ccw ? 'bg-sky-600 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                Berlawanan Jarum Jam (Δθ &gt; 0)
              </button>
              <button
                type="button"
                onClick={() => setCcw(false)}
                className={`flex-1 min-h-9 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  !ccw ? 'bg-sky-600 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                Searah Jarum Jam (Δθ &lt; 0)
              </button>
            </div>

            <div className="flex items-center gap-4 pt-1 text-xs font-medium text-slate-700">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showV}
                  onChange={(e) => setShowV(e.target.checked)}
                  className="rounded accent-sky-600"
                />
                <span>Tampilkan v</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAs}
                  onChange={(e) => setShowAs(e.target.checked)}
                  className="rounded accent-orange-600"
                />
                <span>Tampilkan aₛ</span>
              </label>
            </div>
          </div>

          {/* Live Readout Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-medium text-slate-500">Periode (T = 1/f)</div>
              <div className="font-mono-tabular text-base font-bold text-slate-900">{period.toFixed(2)} s</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-medium text-slate-500">Kec. Sudut (ω = 2πf)</div>
              <div className="font-mono-tabular text-base font-bold text-emerald-700">{omega.toFixed(2)} rad/s</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-medium text-slate-500">Kec. Linear (v = ωr)</div>
              <div className="font-mono-tabular text-base font-bold text-sky-700">{linearV.toFixed(2)} m/s</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-medium text-slate-500">Perc. Sentripetal (aₛ)</div>
              <div className="font-mono-tabular text-base font-bold text-orange-600">{accelS.toFixed(2)} m/s²</div>
            </div>
            <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Posisi Sudut Sesaat</span>
              <span className="font-mono-tabular text-xs font-bold text-slate-900">
                {angleRad.toFixed(2)} rad ({absDeg.toFixed(0)}°)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type WheelMode = 'sepusat' | 'rantai' | 'bersinggungan';

function drawGearWheel(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  angle: number,
  fill: string,
  stroke: string,
  label: string,
  teethCount: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Outer gear teeth
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const outerR = radius + 6;
  const innerR = radius - 3;
  for (let i = 0; i < teethCount * 2; i++) {
    const a = (i * Math.PI) / teethCount;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Spokes to make rotation clearly visible
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  for (let k = 0; k < 4; k++) {
    const sa = (k * Math.PI) / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo((radius - 8) * Math.cos(sa), (radius - 8) * Math.sin(sa));
    ctx.stroke();
  }

  // Marker dot at angle 0
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(radius - 12, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  // Center hub
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Label outside rotation
  ctx.save();
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.fillText(label, cx, cy + radius + 24);
  ctx.restore();
}

export function RodaRodaSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<WheelMode>('rantai');
  const [rACm, setRACm] = useState(15);
  const [rBCm, setRBCm] = useState(25);
  const [omegaA, setOmegaA] = useState(4);
  const [playing, setPlaying] = useState(true);

  const stateRef = useRef({mode, rACm, rBCm, omegaA, playing});
  stateRef.current = {mode, rACm, rBCm, omegaA, playing};

  const anglesRef = useRef({a: 0, b: 0});

  const rAM = rACm / 100;
  const rBM = rBCm / 100;
  const vA = omegaA * rAM;
  const omegaB = mode === 'sepusat' ? omegaA : (omegaA * rAM) / rBM;
  const vB = mode === 'sepusat' ? omegaB * rBM : vA;

  useEffect(() => {
    let animId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const s = stateRef.current;
      const wA = s.omegaA;
      const wB = s.mode === 'sepusat' ? wA : (wA * s.rACm) / s.rBCm;
      const dirB = s.mode === 'bersinggungan' ? -1 : 1;

      if (s.playing) {
        anglesRef.current.a += wA * dt * 0.45;
        anglesRef.current.b += dirB * wB * dt * 0.45;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);

          // Scale 10..40 cm -> 28..76 px
          const pxA = 28 + ((s.rACm - 10) / 30) * 48;
          const pxB = 28 + ((s.rBCm - 10) / 30) * 48;

          const teethA = Math.max(10, Math.round(s.rACm * 0.8));
          const teethB = Math.max(10, Math.round(s.rBCm * 0.8));

          if (s.mode === 'sepusat') {
            const cx = w / 2;
            const cy = h / 2 - 8;
            // Draw larger wheel behind smaller wheel
            if (pxB >= pxA) {
              drawGearWheel(ctx, cx, cy, pxB, anglesRef.current.b, 'rgba(251, 146, 60, 0.28)', '#ea580c', '', teethB);
              drawGearWheel(ctx, cx, cy, pxA, anglesRef.current.a, 'rgba(14, 165, 233, 0.45)', '#0284c7', '', teethA);
            } else {
              drawGearWheel(ctx, cx, cy, pxA, anglesRef.current.a, 'rgba(14, 165, 233, 0.35)', '#0284c7', '', teethA);
              drawGearWheel(ctx, cx, cy, pxB, anglesRef.current.b, 'rgba(251, 146, 60, 0.45)', '#ea580c', '', teethB);
            }
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`Pusat Sama (ωₐ = ωᵦ = ${wA.toFixed(1)} rad/s)`, cx, h - 16);
          } else if (s.mode === 'rantai') {
            const cxA = 125;
            const cxB = 345;
            const cy = h / 2 - 6;

            // Tangent belt lines
            const dx = cxB - cxA;
            const sinAlpha = Math.max(-0.95, Math.min(0.95, (pxA - pxB) / dx));
            const alpha = Math.asin(sinAlpha);

            const topAx = cxA + pxA * Math.sin(alpha);
            const topAy = cy - pxA * Math.cos(alpha);
            const topBx = cxB + pxB * Math.sin(alpha);
            const topBy = cy - pxB * Math.cos(alpha);

            const botAx = cxA + pxA * Math.sin(alpha);
            const botAy = cy + pxA * Math.cos(alpha);
            const botBx = cxB + pxB * Math.sin(alpha);
            const botBy = cy + pxB * Math.cos(alpha);

            ctx.save();
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 4;
            ctx.setLineDash([8, 6]);
            ctx.lineDashOffset = -(anglesRef.current.a * pxA);
            ctx.beginPath();
            ctx.moveTo(topAx, topAy);
            ctx.lineTo(topBx, topBy);
            ctx.moveTo(botBx, botBy);
            ctx.lineTo(botAx, botAy);
            ctx.stroke();
            ctx.restore();

            drawGearWheel(ctx, cxA, cy, pxA, anglesRef.current.a, 'rgba(14, 165, 233, 0.35)', '#0284c7', 'Roda A', teethA);
            drawGearWheel(ctx, cxB, cy, pxB, anglesRef.current.b, 'rgba(251, 146, 60, 0.35)', '#ea580c', 'Roda B', teethB);
          } else {
            // Bersinggungan
            const totalW = pxA + pxB + 8;
            const cxA = w / 2 - totalW / 2 + pxA;
            const cxB = cxA + pxA + pxB + 5;
            const cy = h / 2 - 6;

            drawGearWheel(ctx, cxA, cy, pxA, anglesRef.current.a, 'rgba(14, 165, 233, 0.35)', '#0284c7', 'Roda A (Searah)', teethA);
            drawGearWheel(ctx, cxB, cy, pxB, anglesRef.current.b, 'rgba(5, 150, 105, 0.3)', '#059669', 'Roda B (Berlawanan)', teethB);

            // Highlight contact point
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(cxA + pxA + 2.5, cy, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="card-3d-surface rounded-3xl p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Laboratorium Virtual Hubungan Roda-Roda
          </h3>
          <p className="text-sm text-slate-600">
            Bandingkan arah putaran, kecepatan sudut (ω), dan kelajuan linear (v) pada tiga jenis sistem roda.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{playing ? 'Jeda Putaran' : 'Putar Roda'}</span>
        </button>
      </div>

      {/* Mode tabs */}
      <div className="mb-5 flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
        {(
          [
            {id: 'sepusat', label: '1. Sepusat (Seporos)'},
            {id: 'rantai', label: '2. Dihubungkan Rantai / Sabuk'},
            {id: 'bersinggungan', label: '3. Bersinggungan'},
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`flex-1 min-h-10 rounded-lg px-3 py-2 text-xs font-semibold transition whitespace-nowrap ${
              mode === tab.id
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <canvas
            ref={canvasRef}
            width={470}
            height={290}
            className="w-full max-w-[470px] rounded-xl bg-white"
            aria-label="Kanvas simulasi hubungan roda-roda"
          />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="roda-ra">Jari-jari Roda A (Rₐ)</label>
                <span className="font-mono-tabular text-sky-700">{rACm} cm ({rAM.toFixed(2)} m)</span>
              </div>
              <input
                id="roda-ra"
                type="range"
                min={10}
                max={40}
                step={2}
                value={rACm}
                onChange={(e) => setRACm(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="roda-rb">Jari-jari Roda B (Rᵦ)</label>
                <span className="font-mono-tabular text-orange-700">{rBCm} cm ({rBM.toFixed(2)} m)</span>
              </div>
              <input
                id="roda-rb"
                type="range"
                min={10}
                max={40}
                step={2}
                value={rBCm}
                onChange={(e) => setRBCm(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="roda-wa">Kecepatan Sudut Roda A (ωₐ)</label>
                <span className="font-mono-tabular text-sky-700">{omegaA.toFixed(1)} rad/s</span>
              </div>
              <input
                id="roda-wa"
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={omegaA}
                onChange={(e) => setOmegaA(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Besaran yang Sama</span>
              <span className="font-bold text-emerald-700">
                {mode === 'sepusat' ? 'ωₐ = ωᵦ (Kecepatan Sudut)' : 'vₐ = vᵦ (Kecepatan Linear)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Arah Putar Roda B vs A</span>
              <span className="font-bold text-slate-900">
                {mode === 'bersinggungan' ? 'Berlawanan Arah' : 'Searah'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div className="rounded-lg bg-sky-50 p-2.5">
                <div className="text-[11px] text-sky-700">Roda A</div>
                <div className="font-mono-tabular text-xs font-bold text-slate-900">ωₐ = {omegaA.toFixed(2)} rad/s</div>
                <div className="font-mono-tabular text-xs font-semibold text-sky-800">vₐ = {vA.toFixed(2)} m/s</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-2.5">
                <div className="text-[11px] text-orange-700">Roda B</div>
                <div className="font-mono-tabular text-xs font-bold text-slate-900">ωᵦ = {omegaB.toFixed(2)} rad/s</div>
                <div className="font-mono-tabular text-xs font-semibold text-orange-800">vᵦ = {vB.toFixed(2)} m/s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormulaCalculator() {
  const [calcTab, setCalcTab] = useState<'tf' | 'gmb' | 'gmbb' | 'roda'>('tf');

  // Tab 1: T & f
  const [nPutaran, setNPutaran] = useState(12);
  const [tWaktu, setTWaktu] = useState(60);

  // Tab 2: GMB
  const [rMeter, setRMeter] = useState(0.5);
  const [omegaVal, setOmegaVal] = useState(10);
  const [massaKg, setMassaKg] = useState(2);

  // Tab 3: Alpha & at
  const [w0, setW0] = useState(20);
  const [w1, setW1] = useState(50);
  const [dtSec, setDtSec] = useState(15);
  const [rTang, setRTang] = useState(0.4);

  // Tab 4: Roda-roda
  const [wheelType, setWheelType] = useState<'sepusat' | 'rantai'>('rantai');
  const [r1Cm, setR1Cm] = useState(8);
  const [r2Cm, setR2Cm] = useState(15);
  const [w1Wheel, setW1Wheel] = useState(100);

  const safeT = tWaktu > 0 ? tWaktu : 1;
  const safeN = nPutaran > 0 ? nPutaran : 1;
  const periode = safeT / safeN;
  const frekuensi = safeN / safeT;
  const omegaTF = 2 * Math.PI * frekuensi;

  const vGmb = omegaVal * rMeter;
  const asGmb = omegaVal * omegaVal * rMeter;
  const fsGmb = massaKg * asGmb;

  const safeDt = dtSec > 0 ? dtSec : 1;
  const alphaVal = (w1 - w0) / safeDt;
  const atVal = alphaVal * rTang;

  const safeR2 = r2Cm > 0 ? r2Cm : 1;
  const vWheel1 = w1Wheel * (r1Cm / 100);
  const wWheel2 = wheelType === 'sepusat' ? w1Wheel : (w1Wheel * r1Cm) / safeR2;
  const vWheel2 = wWheel2 * (r2Cm / 100);

  return (
    <div className="card-3d-surface rounded-3xl p-5 md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Kalkulator Rumus Gerak Melingkar</h3>
          <p className="text-sm text-slate-600">
            Uji perhitungan mandiri untuk memverifikasi latihan soal sesuai satuan SI modul.
          </p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
        {(
          [
            {id: 'tf', label: 'Periode & Frekuensi'},
            {id: 'gmb', label: 'v, ω, aₛ, & Fₛ'},
            {id: 'gmbb', label: 'Percepatan α & aₜ'},
            {id: 'roda', label: 'Hubungan Roda-Roda'},
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setCalcTab(t.id)}
            className={`flex-1 min-h-9 rounded-lg px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
              calcTab === t.id ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {calcTab === 'tf' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Jumlah Putaran (n)
              <input
                type="number"
                min={1}
                value={nPutaran}
                onChange={(e) => setNPutaran(Math.max(1, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Waktu Total t (sekon)
              <input
                type="number"
                min={0.1}
                step={0.5}
                value={tWaktu}
                onChange={(e) => setTWaktu(Math.max(0.1, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <MathFormula latex={`T = \\frac{t}{n} = \\frac{${safeT}}{${safeN}} = ${periode.toFixed(3)}\\text{ s}`} block />
            <MathFormula latex={`f = \\frac{n}{t} = \\frac{${safeN}}{${safeT}} = ${frekuensi.toFixed(4)}\\text{ Hz}`} block />
            <MathFormula latex={`\\omega = 2\\pi f = ${omegaTF.toFixed(3)}\\text{ rad/s}`} block />
          </div>
        </div>
      )}

      {calcTab === 'gmb' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Jari-jari r (meter)
              <input
                type="number"
                min={0.01}
                step={0.05}
                value={rMeter}
                onChange={(e) => setRMeter(Math.max(0.01, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Kecepatan Sudut ω (rad/s)
              <input
                type="number"
                min={0}
                step={0.5}
                value={omegaVal}
                onChange={(e) => setOmegaVal(Math.max(0, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Massa Benda m (kg)
              <input
                type="number"
                min={0.1}
                step={0.5}
                value={massaKg}
                onChange={(e) => setMassaKg(Math.max(0.1, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <MathFormula latex={`v = \\omega r = ${vGmb.toFixed(3)}\\text{ m/s}`} block />
            <MathFormula latex={`a_s = \\omega^2 r = ${asGmb.toFixed(3)}\\text{ m/s}^2`} block />
            <MathFormula latex={`F_s = m a_s = ${fsGmb.toFixed(3)}\\text{ N}`} block />
          </div>
        </div>
      )}

      {calcTab === 'gmbb' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-semibold text-slate-700">
              ω₀ Awal (rad/s)
              <input
                type="number"
                value={w0}
                onChange={(e) => setW0(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              ω Akhir (rad/s)
              <input
                type="number"
                value={w1}
                onChange={(e) => setW1(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Selang Waktu Δt (s)
              <input
                type="number"
                min={0.1}
                step={0.5}
                value={dtSec}
                onChange={(e) => setDtSec(Math.max(0.1, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Jari-jari R (m)
              <input
                type="number"
                min={0.01}
                step={0.05}
                value={rTang}
                onChange={(e) => setRTang(Math.max(0.01, Number(e.target.value)))}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono-tabular text-sm text-slate-900"
              />
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <MathFormula latex={`\\alpha = \\frac{\\omega - \\omega_0}{\\Delta t} = \\frac{${w1} - ${w0}}{${safeDt}} = ${alphaVal.toFixed(3)}\\text{ rad/s}^2`} block />
            <MathFormula latex={`a_t = \\alpha R = ${alphaVal.toFixed(3)} \\times ${rTang} = ${atVal.toFixed(3)}\\text{ m/s}^2`} block />
          </div>
        </div>
      )}

      {calcTab === 'roda' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWheelType('sepusat')}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  wheelType === 'sepusat' ? 'bg-sky-600 text-white' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                Sepusat
              </button>
              <button
                type="button"
                onClick={() => setWheelType('rantai')}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  wheelType === 'rantai' ? 'bg-sky-600 text-white' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                Rantai / Bersinggungan
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <label className="block text-xs font-semibold text-slate-700">
                R₁ (cm)
                <input
                  type="number"
                  min={1}
                  value={r1Cm}
                  onChange={(e) => setR1Cm(Math.max(1, Number(e.target.value)))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-2.5 py-2 font-mono-tabular text-sm"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                R₂ (cm)
                <input
                  type="number"
                  min={1}
                  value={r2Cm}
                  onChange={(e) => setR2Cm(Math.max(1, Number(e.target.value)))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-2.5 py-2 font-mono-tabular text-sm"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                ω₁ (rad/s)
                <input
                  type="number"
                  min={0}
                  value={w1Wheel}
                  onChange={(e) => setW1Wheel(Math.max(0, Number(e.target.value)))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-2.5 py-2 font-mono-tabular text-sm"
                />
              </label>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <MathFormula latex={`v_1 = \\omega_1 R_1 = ${vWheel1.toFixed(2)}\\text{ m/s}`} block />
            <MathFormula latex={`\\omega_2 = ${wWheel2.toFixed(2)}\\text{ rad/s}, \\quad v_2 = ${vWheel2.toFixed(2)}\\text{ m/s}`} block />
          </div>
        </div>
      )}
    </div>
  );
}
