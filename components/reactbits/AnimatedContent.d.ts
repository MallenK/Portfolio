import type { ReactNode } from 'react';

/**
 * Type companion for AnimatedContent.jsx (reactbits gsap reveal wrapper).
 * The runtime lives in the .jsx file; this only describes its props so
 * TS consumers don't infer optional params as required.
 */
export interface AnimatedContentProps {
  children?: ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  [key: string]: unknown;
}

declare const AnimatedContent: (props: AnimatedContentProps) => JSX.Element;
export default AnimatedContent;
