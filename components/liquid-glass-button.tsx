'use client';

import { Glass } from '@samasante/liquid-glass';
import type { ReactNode } from 'react';

type LiquidGlassButtonProps = {
  href: string;
  children: ReactNode;
};

const subtleButtonOptics = {
  strength: 0.05,
  depth: 0.2,
  curvature: 0.5,
  dispersion: 0.4,
  bend: 0.15,
  bendWidth: 0.11,
  sheen: 1,
  sheenWidth: 3.5,
  specular: 1.6,
  glow: 0.1,
  frost: 1,
} as const;

export function LiquidGlassButton({ href, children }: LiquidGlassButtonProps) {
  return (
    <Glass className="ghost-button liquid-glass-button" radius={20} optics={subtleButtonOptics}>
      <a className="ghost-button-link" href={href}>
        {children}
      </a>
    </Glass>
  );
}
