import React from 'react';

interface FairyBulbProps {
  x: string;
  y: number;
  color: string;
  glowColor: string;
  twinkleClass: string;
  rotate?: number;
  isNochebuena?: boolean;
}

const FairyLightBulb: React.FC<FairyBulbProps> = ({
  x,
  y,
  color,
  glowColor,
  twinkleClass,
  rotate = 0,
  isNochebuena = false,
}) => {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: x,
        top: `${y}px`,
        transform: `translateX(-50%) rotate(${rotate}deg)`,
      }}
    >
      <svg
        width={isNochebuena ? "24" : "20"}
        height={isNochebuena ? "34" : "30"}
        viewBox="0 0 20 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Hanging cord attachment */}
        <line x1="10" y1="0" x2="10" y2="5" stroke="#14532d" strokeWidth="2" />

        {/* Brass/Gold Bulb Socket Cap */}
        <rect
          x="7"
          y="4"
          width="6"
          height="5"
          rx="1.5"
          fill="#eab308"
          stroke="#a16207"
          strokeWidth="0.8"
        />

        {/* Twinkling SVG Fairy Light Bulb */}
        <g
          className={`${twinkleClass} ${isNochebuena ? 'nochebuena-lights-glow' : ''}`}
          style={{ color: glowColor, transformOrigin: '10px 16px' }}
        >
          {/* Outer soft halo */}
          <circle
            cx="10"
            cy="17"
            r={isNochebuena ? "13" : "9"}
            fill={glowColor}
            fillOpacity={isNochebuena ? "0.55" : "0.28"}
          />
          {/* Classic Christmas C9 / Tear-drop Bulb Shape */}
          <path
            d="M10 8.5C6.8 8.5 5 11.5 5 15.2C5 19.5 8.2 23.5 10 25.5C11.8 23.5 15 19.5 15 15.2C15 11.5 13.2 8.5 10 8.5Z"
            fill={color}
            stroke="#ffffff"
            strokeWidth={isNochebuena ? "1.2" : "0.8"}
            strokeOpacity="0.8"
          />
          {/* Inner filament highlight */}
          <ellipse cx="8.3" cy="14" rx="1.8" ry="3.4" fill="#ffffff" fillOpacity="0.85" />
        </g>
      </svg>
    </div>
  );
};


const LIGHTS: FairyBulbProps[] = [
  { x: '3%', y: 8, color: '#dc2626', glowColor: '#ef4444', twinkleClass: 'animate-twinkle-1', rotate: 8 },
  { x: '9%', y: 15, color: '#16a34a', glowColor: '#22c55e', twinkleClass: 'animate-twinkle-2', rotate: -6 },
  { x: '15%', y: 10, color: '#eab308', glowColor: '#facc15', twinkleClass: 'animate-twinkle-3', rotate: 5 },
  { x: '21%', y: 6, color: '#ec4899', glowColor: '#f472b6', twinkleClass: 'animate-twinkle-4', rotate: -8 },
  { x: '27%', y: 14, color: '#0284c7', glowColor: '#38bdf8', twinkleClass: 'animate-twinkle-1', rotate: 6 },
  { x: '33%', y: 11, color: '#dc2626', glowColor: '#ef4444', twinkleClass: 'animate-twinkle-2', rotate: -5 },
  { x: '39%', y: 6, color: '#16a34a', glowColor: '#22c55e', twinkleClass: 'animate-twinkle-3', rotate: 7 },
  { x: '45%', y: 15, color: '#eab308', glowColor: '#facc15', twinkleClass: 'animate-twinkle-4', rotate: -6 },
  { x: '51%', y: 10, color: '#dc2626', glowColor: '#ef4444', twinkleClass: 'animate-twinkle-1', rotate: 4 },
  { x: '57%', y: 6, color: '#0284c7', glowColor: '#38bdf8', twinkleClass: 'animate-twinkle-2', rotate: -7 },
  { x: '63%', y: 14, color: '#16a34a', glowColor: '#22c55e', twinkleClass: 'animate-twinkle-3', rotate: 6 },
  { x: '69%', y: 11, color: '#ec4899', glowColor: '#f472b6', twinkleClass: 'animate-twinkle-4', rotate: -5 },
  { x: '75%', y: 6, color: '#eab308', glowColor: '#facc15', twinkleClass: 'animate-twinkle-1', rotate: 8 },
  { x: '81%', y: 15, color: '#dc2626', glowColor: '#ef4444', twinkleClass: 'animate-twinkle-2', rotate: -6 },
  { x: '87%', y: 10, color: '#16a34a', glowColor: '#22c55e', twinkleClass: 'animate-twinkle-3', rotate: 5 },
  { x: '93%', y: 6, color: '#eab308', glowColor: '#facc15', twinkleClass: 'animate-twinkle-4', rotate: -8 },
  { x: '98%', y: 13, color: '#dc2626', glowColor: '#ef4444', twinkleClass: 'animate-twinkle-1', rotate: 4 },
];

export const ChristmasGarland: React.FC<{ isNochebuena?: boolean }> = ({ isNochebuena = false }) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 w-full h-11 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Evergreen Pine Garland Boughs & Twisted Wire SVG */}
      <svg
        className="w-full h-8"
        viewBox="0 0 1440 42"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Lush Scalloped Pine Foliage Base */}
        <path
          d="M0 0 H1440 V12 Q1350 32 1260 12 Q1170 32 1080 12 Q990 32 900 12 Q810 32 720 12 Q630 32 540 12 Q450 32 360 12 Q270 32 180 12 Q90 32 0 12 Z"
          fill="url(#pineGrad)"
          fillOpacity="0.92"
        />

        {/* Secondary Layered Pine Needles Accent */}
        <path
          d="M0 0 H1440 V7 Q1395 24 1350 9 Q1305 24 1260 9 Q1215 24 1170 9 Q1125 24 1080 9 Q1035 24 990 9 Q945 24 900 9 Q855 24 810 9 Q765 24 720 9 Q675 24 630 9 Q585 24 540 9 Q495 24 450 9 Q405 24 360 9 Q315 24 270 9 Q225 24 180 9 Q135 24 90 9 Q45 24 0 9 Z"
          fill="#15803d"
        />

        {/* Festive Red Ribbon & Gold Cord */}
        <path
          d="M0 10 Q90 30 180 10 T360 10 T540 10 T720 10 T900 10 T1080 10 T1260 10 T1440 10"
          stroke="#dc2626"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M0 12 Q90 28 180 12 T360 12 T540 12 T720 12 T900 12 T1080 12 T1260 12 T1440 12"
          stroke="#facc15"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          fill="none"
        />

        {/* Holly Berries Clusters at Garland Peaks */}
        {[180, 360, 540, 720, 900, 1080, 1260].map((cx) => (
          <g key={cx}>
            <circle cx={cx - 4} cy={11} r="3.5" fill="#dc2626" />
            <circle cx={cx + 4} cy={11} r="3.5" fill="#dc2626" />
            <circle cx={cx} cy={15} r="3.5" fill="#ef4444" />
            <circle cx={cx} cy={10} r="1.5" fill="#fef08a" />
          </g>
        ))}
      </svg>

      {/* SVG-Based Fairy Light Bulbs with Twinkle Animations */}
      {LIGHTS.map((bulb, idx) => (
        <FairyLightBulb key={idx} {...bulb} isNochebuena={isNochebuena} />
      ))}
    </div>
  );
};
