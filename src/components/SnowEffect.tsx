import React, { useMemo } from 'react';

interface SnowflakeData {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: string;
  opacity: number;
  symbol: string;
  color: string;
}

export const SnowEffect: React.FC<{ enabled: boolean; isNochebuena?: boolean }> = ({
  enabled,
  isNochebuena = false,
}) => {
  const snowflakes = useMemo(() => {
    const symbols = ['❄', '❅', '❆', '•', '✨'];
    const dayColors = ['#dc2626', '#16a34a', '#38bdf8', '#f472b6', '#eab308'];
    const nightColors = ['#ffffff', '#fde047', '#a5f3fc', '#fbcfe8', '#fef08a'];
    const activeColors = isNochebuena ? nightColors : dayColors;

    const items: SnowflakeData[] = [];
    for (let i = 0; i < 32; i++) {
      items.push({
        id: i,
        left: `${(i * 3.1 + (i % 3)).toFixed(1)}%`,
        duration: `${(6.5 + (i % 6)).toFixed(1)}s`,
        delay: `${((i * 0.35) % 6).toFixed(1)}s`,
        size: `${12 + (i % 12)}px`,
        opacity: +(0.45 + ((i % 5) * 0.12)).toFixed(2),
        symbol: symbols[i % symbols.length],
        color: activeColors[i % activeColors.length],
      });
    }
    return items;
  }, [isNochebuena]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {snowflakes.map((s) => (
        <span
          key={s.id}
          className="snowflake"
          style={{
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
            fontSize: s.size,
            opacity: s.opacity,
            color: s.color,
            filter: isNochebuena ? 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' : undefined,
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
};

