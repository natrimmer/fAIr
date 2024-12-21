import { IconProps } from "@/types";
import React from "react";

export const FullScreenIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 9.47043C0.5 9.74613 0.7235 9.96963 0.999201 9.96963H3.32391L0.646213 12.6473C0.451263 12.8423 0.451263 13.1583 0.646213 13.3533C0.841163 13.5482 1.15724 13.5483 1.35219 13.3533L4.02988 10.6756V13.0003C4.02988 13.276 4.25338 13.4995 4.52908 13.4995C4.80478 13.4995 5.02829 13.276 5.02828 13.0003V9.47043C5.02829 9.19473 4.80478 8.97123 4.52908 8.97123H0.999201C0.7235 8.97123 0.5 9.19473 0.5 9.47043ZM13.0008 9.96963C13.2765 9.96963 13.5 9.74613 13.5 9.47043C13.5 9.19473 13.2765 8.97123 13.0008 8.97123H9.47092C9.19522 8.97123 8.97172 9.19473 8.97172 9.47043V13.0003C8.97172 13.276 9.19522 13.4995 9.47092 13.4995C9.74662 13.4995 9.97012 13.276 9.97012 13.0003V10.6756L12.6478 13.3533C12.8428 13.5483 13.1588 13.5482 13.3538 13.3533C13.5487 13.1583 13.5487 12.8423 13.3538 12.6473L10.6761 9.96963H13.0008ZM4.02988 0.998713C4.02988 0.723012 4.25338 0.499512 4.52908 0.499512C4.80478 0.499512 5.02828 0.723011 5.02828 0.998713V4.52859C5.02828 4.8043 4.80478 5.02779 4.52908 5.0278H0.999201C0.7235 5.0278 0.500001 4.8043 0.5 4.52859C0.500001 4.25289 0.7235 4.02939 0.999201 4.02939H3.32391L0.646213 1.3517C0.451263 1.15675 0.451263 0.840675 0.646213 0.645725C0.841163 0.450775 1.15724 0.450775 1.35219 0.645725L4.02988 3.32342V0.998713ZM9.97012 0.998713C9.97012 0.723012 9.74662 0.499512 9.47092 0.499512C9.19522 0.499512 8.97172 0.723012 8.97172 0.998712V4.52859C8.97172 4.8043 9.19522 5.0278 9.47092 5.0278L13.0008 5.0278C13.2765 5.0278 13.5 4.8043 13.5 4.52859C13.5 4.25289 13.2765 4.02939 13.0008 4.02939H10.6761L13.3538 1.3517C13.5487 1.15675 13.5487 0.840675 13.3538 0.645725C13.1588 0.450774 12.8428 0.450774 12.6478 0.645725L9.97012 3.32342V0.998713Z"
      fill="currentColor"
    />
  </svg>
);
