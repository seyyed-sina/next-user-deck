import type { FC, SVGProps } from "react";

import { clx } from "@/utils/styles";

export interface LoadingSpinnerProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 36,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 50 50"
      className={clx(`spinner origin-center`, props.className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animation: "rotate 2s linear infinite",
        border: "1px solid transparent",
      }}
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={props.stroke ?? "var(--color-primary)"}
        strokeWidth={5}
        style={{
          strokeLinecap: "round",
          animation: "dash 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </svg>
  );
};
