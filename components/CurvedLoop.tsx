"use client";

import React, { useEffect, useRef, useState } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText: string;
  speed?: number;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  className?: string;
}

export default function CurvedLoop({
  marqueeText,
  speed = 2,
  curveAmount = 300,
  direction = 'left',
  interactive = true,
  className = '',
}: CurvedLoopProps) {
  const [offset, setOffset] = useState(0);
  const uniqueId = useRef(`curved-path-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!interactive) return;

    let animationFrame: number;
    let currentOffset = 0;

    const animate = () => {
      const increment = (speed || 2) * 0.05 * (direction === 'left' ? -1 : 1);
      currentOffset += increment;
      
      if (currentOffset > 100) {
        currentOffset = 0;
      } else if (currentOffset < 0) {
        currentOffset = 100;
      }
      
      setOffset(currentOffset);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [interactive, speed, direction]);

  const height = curveAmount || 300;
  const pathD = `M 0,${height / 2} Q 500,0 1000,${height / 2} T 2000,${height / 2}`;

  return (
    <div className={`curved-loop-jacket ${className}`}>
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id={uniqueId.current}
            d={pathD}
            fill="none"
          />
        </defs>
        <text fill="#ffffff" fontSize="60" fontWeight="700">
          <textPath
            href={`#${uniqueId.current}`}
            startOffset={interactive ? `${offset}%` : '0%'}
          >
            {Array(20).fill(marqueeText).join(' • ')}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
