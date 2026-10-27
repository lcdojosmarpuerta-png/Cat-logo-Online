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

export const SnowEffect: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const snowflakes = useMemo(() => {
    const symbols = ['❄', '❅', '❆', '•', '✨'];
    const colors = ['#dc2626', '#16a34a', '#38bdf8', '#f472b6', '#eab308'];
    const items: SnowflakeData[] = [];
    for (let i = 0; i < 28; i++) {
      items.push({
        id: i,
        left: `${(i * 3.5 + (i % 3)).toFixed(1)}%`,
        duration: `${(7 + (i % 7)).toFixed(1)}s`,
        delay: `${((i * 0.4) % 6).toFixed(1)}s`,
        size: `${12 + (i % 10)}px`,
        opacity: +(0.35 + ((i % 5) * 0.1)).toFixed(2),
        symbol: symbols[i % symbols.length],
        color: colors[i % colors.length],
      });
    }
    return items;
  }, []);

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
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
};
