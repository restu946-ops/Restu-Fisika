import {StimulusDiagramType} from '../types/mpi';

interface PhysicsDiagramSvgProps {
  type: StimulusDiagramType;
  caption?: string;
}

export function PhysicsDiagramSvg({type, caption}: PhysicsDiagramSvgProps) {
  if (type === 'none' || type === 'table-data') return null;

  return (
    <figure className="my-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex justify-center">
        {type === 'gmb-vectors' && (
          <svg viewBox="0 0 320 220" className="h-48 w-full max-w-xs" aria-label="Diagram vektor Gerak Melingkar Beraturan">
            <defs>
              <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#0284c7" />
              </marker>
              <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#ea580c" />
              </marker>
            </defs>
            <circle cx="160" cy="115" r="74" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="160" cy="115" r="4" fill="#0f172a" />
            <text x="150" y="132" className="fill-slate-700 text-[12px] font-semibold">O</text>
            {/* Reference horizontal line */}
            <line x1="160" y1="115" x2="234" y2="115" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Radius to particle at 50 deg */}
            <line x1="160" y1="115" x2="207.5" y2="58.3" stroke="#0f172a" strokeWidth="2" />
            <text x="174" y="83" className="fill-slate-800 text-[12px] font-semibold">R</text>
            {/* Angle arc */}
            <path d="M 186 115 A 26 26 0 0 0 176.7 95" fill="none" stroke="#0284c7" strokeWidth="2" />
            <text x="190" y="106" className="fill-sky-700 text-[12px] font-semibold">θ</text>
            {/* Centripetal acceleration */}
            <line x1="207.5" y1="58.3" x2="177" y2="94.5" stroke="#ea580c" strokeWidth="2.5" markerEnd="url(#arrowOrange)" />
            <text x="192" y="90" className="fill-orange-600 text-[12px] font-bold">aₛ</text>
            {/* Tangential velocity */}
            <line x1="207.5" y1="58.3" x2="164" y2="22" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
            <text x="152" y="20" className="fill-sky-700 text-[12px] font-bold">v</text>
            {/* Particle */}
            <circle cx="207.5" cy="58.3" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            {/* Rotation arrow */}
            <path d="M 105 60 A 78 78 0 0 0 92 140" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowBlue)" />
            <text x="72" y="105" className="fill-emerald-700 text-[12px] font-semibold">ω</text>
          </svg>
        )}

        {type === 'roda-sepusat' && (
          <svg viewBox="0 0 280 200" className="h-44 w-full max-w-xs" aria-label="Diagram dua roda sepusat">
            <circle cx="140" cy="100" r="76" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <circle cx="140" cy="100" r="38" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
            <circle cx="140" cy="100" r="4" fill="#0f172a" />
            <line x1="140" y1="100" x2="178" y2="100" stroke="#ea580c" strokeWidth="2" />
            <text x="148" y="94" className="fill-orange-700 text-[11px] font-bold">Rₐ</text>
            <line x1="140" y1="100" x2="140" y2="24" stroke="#0284c7" strokeWidth="2" />
            <text x="146" y="48" className="fill-sky-800 text-[11px] font-bold">Rᵦ</text>
            <text x="128" y="156" className="fill-sky-900 text-[12px] font-bold">Roda B</text>
            <text x="119" y="122" className="fill-orange-900 text-[11px] font-bold">Roda A</text>
          </svg>
        )}

        {type === 'roda-rantai' && (
          <svg viewBox="0 0 320 180" className="h-44 w-full max-w-sm" aria-label="Diagram dua roda dihubungkan rantai">
            {/* Belt lines */}
            <line x1="80" y1="54" x2="230" y2="34" stroke="#334155" strokeWidth="3" />
            <line x1="80" y1="126" x2="230" y2="146" stroke="#334155" strokeWidth="3" />
            {/* Wheel A */}
            <circle cx="80" cy="90" r="36" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <circle cx="80" cy="90" r="4" fill="#0f172a" />
            <line x1="80" y1="90" x2="116" y2="90" stroke="#0284c7" strokeWidth="2" />
            <text x="86" y="84" className="fill-sky-900 text-[11px] font-bold">Rₐ</text>
            <text x="66" y="146" className="fill-slate-800 text-[12px] font-bold">Roda A</text>
            {/* Wheel B */}
            <circle cx="230" cy="90" r="56" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
            <circle cx="230" cy="90" r="4" fill="#0f172a" />
            <line x1="230" y1="90" x2="286" y2="90" stroke="#ea580c" strokeWidth="2" />
            <text x="242" y="84" className="fill-orange-900 text-[11px] font-bold">Rᵦ</text>
            <text x="214" y="166" className="fill-slate-800 text-[12px] font-bold">Roda B</text>
          </svg>
        )}

        {type === 'roda-singgung' && (
          <svg viewBox="0 0 320 180" className="h-44 w-full max-w-sm" aria-label="Diagram dua roda bersinggungan">
            <circle cx="105" cy="90" r="56" fill="#dcfce7" stroke="#059669" strokeWidth="3" />
            <circle cx="105" cy="90" r="4" fill="#0f172a" />
            <line x1="105" y1="90" x2="49" y2="90" stroke="#059669" strokeWidth="2" />
            <text x="64" y="84" className="fill-emerald-900 text-[11px] font-bold">R₁</text>
            <text x="86" y="164" className="fill-slate-800 text-[12px] font-bold">Roda 1</text>

            <circle cx="197" cy="90" r="36" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
            <circle cx="197" cy="90" r="4" fill="#0f172a" />
            <line x1="197" y1="90" x2="233" y2="90" stroke="#dc2626" strokeWidth="2" />
            <text x="204" y="84" className="fill-red-900 text-[11px] font-bold">R₂</text>
            <text x="180" y="148" className="fill-slate-800 text-[12px] font-bold">Roda 2</text>

            <circle cx="161" cy="90" r="4" fill="#f59e0b" />
          </svg>
        )}

        {type === 'tali-lilit' && (
          <svg viewBox="0 0 280 180" className="h-44 w-full max-w-xs" aria-label="Diagram tali melilit pada roda">
            <defs>
              <marker id="arrowTali" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#0284c7" />
              </marker>
            </defs>
            <circle cx="110" cy="100" r="52" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
            <circle cx="110" cy="100" r="4" fill="#0f172a" />
            <line x1="110" y1="100" x2="147" y2="137" stroke="#0f172a" strokeWidth="2" />
            <text x="134" y="116" className="fill-slate-800 text-[12px] font-bold">R</text>
            {/* Tangent rope */}
            <line x1="110" y1="48" x2="235" y2="48" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrowTali)" />
            <circle cx="185" cy="48" r="5" fill="#ea580c" />
            <text x="181" y="36" className="fill-slate-900 text-[12px] font-bold">A</text>
            <text x="210" y="36" className="fill-sky-700 text-[11px] font-bold">v = 5 m/s</text>
          </svg>
        )}

        {type === 'tiga-roda-kombinasi' && (
          <svg viewBox="0 0 340 190" className="h-44 w-full max-w-sm" aria-label="Diagram sistem tiga roda A, B, dan C">
            {/* Belt between B (inner left) and C (right) */}
            <line x1="95" y1="68" x2="270" y2="79" stroke="#334155" strokeWidth="2.5" />
            <line x1="95" y1="122" x2="270" y2="111" stroke="#334155" strokeWidth="2.5" />
            {/* Wheel A */}
            <circle cx="95" cy="95" r="64" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <text x="44" y="64" className="fill-sky-900 text-[13px] font-bold">A</text>
            {/* Wheel B concentric */}
            <circle cx="95" cy="95" r="27" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
            <circle cx="95" cy="95" r="3.5" fill="#0f172a" />
            <text x="90" y="90" className="fill-orange-900 text-[12px] font-bold">B</text>
            {/* Wheel C */}
            <circle cx="270" cy="95" r="16" fill="#dcfce7" stroke="#059669" strokeWidth="3" />
            <circle cx="270" cy="95" r="3" fill="#0f172a" />
            <text x="265" y="70" className="fill-emerald-900 text-[13px] font-bold">C</text>
          </svg>
        )}

        {type === 'tali-dua-benda' && (
          <svg viewBox="0 0 260 200" className="h-44 w-full max-w-xs" aria-label="Diagram benda A dan B diikat tali secara berurutan">
            <circle cx="130" cy="100" r="82" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
            <circle cx="130" cy="100" r="32" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="130" cy="100" r="4" fill="#0f172a" />
            <text x="116" y="114" className="fill-slate-800 text-[12px] font-bold">O</text>
            <line x1="130" y1="100" x2="188" y2="42" stroke="#0f172a" strokeWidth="2.5" />
            {/* Mass A */}
            <circle cx="152" cy="78" r="7" fill="#0284c7" stroke="#fff" strokeWidth="2" />
            <text x="158" y="88" className="fill-sky-800 text-[12px] font-bold">A</text>
            {/* Mass B */}
            <circle cx="188" cy="42" r="7" fill="#ea580c" stroke="#fff" strokeWidth="2" />
            <text x="198" y="45" className="fill-orange-700 text-[12px] font-bold">B</text>
          </svg>
        )}

        {type === 'empat-roda' && (
          <svg viewBox="0 0 340 210" className="h-48 w-full max-w-sm" aria-label="Diagram susunan 4 roda I, II, III, IV">
            {/* Belt between II (outer right-top) and III (left) */}
            <line x1="78" y1="45" x2="215" y2="38" stroke="#334155" strokeWidth="2.5" />
            <line x1="78" y1="95" x2="215" y2="108" stroke="#334155" strokeWidth="2.5" />
            {/* Wheel III */}
            <circle cx="78" cy="70" r="25" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <circle cx="78" cy="70" r="3" fill="#0f172a" />
            <text x="71" y="75" className="fill-sky-900 text-[12px] font-bold">III</text>
            {/* Wheel II */}
            <circle cx="215" cy="73" r="35" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <text x="210" y="54" className="fill-sky-900 text-[11px] font-bold">II</text>
            {/* Wheel I concentric inside II */}
            <circle cx="215" cy="73" r="17" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="215" cy="73" r="3" fill="#0f172a" />
            <text x="212" y="78" className="fill-slate-900 text-[11px] font-bold">I</text>
            {/* Wheel IV touching Wheel II */}
            <circle cx="255" cy="144" r="46" fill="#bae6fd" stroke="#0284c7" strokeWidth="3" />
            <circle cx="255" cy="144" r="3.5" fill="#0f172a" />
            <text x="247" y="149" className="fill-sky-950 text-[12px] font-bold">IV</text>
          </svg>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-500">{caption}</figcaption>
      )}
    </figure>
  );
}
