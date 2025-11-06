import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      fill="none"
      {...props}
    >
      <text
        x="0"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="currentColor"
      >
        Fadex
      </text>
    </svg>
  ),
};
