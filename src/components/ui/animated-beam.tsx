"use client";

import React, { forwardRef, useRef, useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  dashed?: boolean;
  rightAngle?: boolean;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 2,
  delay = 0,
  pathColor = "#e5e7eb",
  pathWidth = 2,
  pathOpacity = 1,
  gradientStartColor = "#323dfe",
  gradientStopColor = "#323dfe",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  dashed = false,
  rightAngle = false,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      let d: string;
      if (rightAngle) {
        // Right-angle path: horizontal from start, vertical turn, horizontal to end
        const midX = (startX + endX) / 2;
        d = `M ${startX},${startY} H ${midX} V ${endY} H ${endX}`;
      } else {
        // Quadratic bezier curve
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2 - curvature;
        d = `M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`;
      }
      setPathD(d);
    };

    // Initial update with delay to ensure refs are ready
    const timeoutId = setTimeout(updatePath, 100);

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePath);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!pathD || svgDimensions.width === 0) {
    return null;
  }

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient
          id={`gradient-${id}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} />
          <stop offset="50%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStartColor} />
        </linearGradient>
        <mask id={`mask-${id}`}>
          <path
            d={pathD}
            stroke="white"
            strokeWidth={pathWidth}
            fill="none"
            strokeLinecap="round"
            {...(dashed && { strokeDasharray: "6 4" })}
          />
        </mask>
      </defs>
      {/* Background path */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        fill="none"
        {...(dashed && { strokeDasharray: "6 4" })}
      />
      {/* Animated gradient path */}
      <g mask={`url(#mask-${id})`}>
        <rect
          x="-50%"
          y="0"
          width="200%"
          height="100%"
          fill={`url(#gradient-${id})`}
          style={{
            animation: `beam-slide ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        />
      </g>
      <style>{`
        @keyframes beam-slide {
          0% {
            transform: translateX(-33%);
          }
          100% {
            transform: translateX(33%);
          }
        }
      `}</style>
    </svg>
  );
};

export const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";
