import type { Settings } from '@/db/settings';
import { ML_PER_GLASS } from '@/utils/constants';

// Length of the progress arc; the dash offset shortens it to show progress.
const CIRCUMFERENCE = 2 * Math.PI * 52;

interface ProgressRingProps {
  glasses: number;
  goal: number;
  trackingUnit: Settings['trackingUnit'];
  color?: string;
}

/**
 * Circular progress ring that visualizes daily hydration progress.
 * Supports both glasses and millilitre display modes.
 *
 * @param {ProgressRingProps} props - Glasses consumed, daily goal, tracking unit, and optional stroke color.
 * @returns {JSX.Element} The rendered progress ring.
 */
export default function ProgressRing({ glasses, goal, trackingUnit, color }: Readonly<ProgressRingProps>) {
  const progress = Math.min(1, glasses / goal);
  const offset = CIRCUMFERENCE * (1 - progress);
  const strokeClass = color ?? 'stroke-primary';

  // Progress fill always tracks glass count; only the numeric readout scales to the chosen unit.
  const isMl = trackingUnit === 'ml';
  const current = isMl ? glasses * ML_PER_GLASS : glasses;
  const unitLabel = isMl ? 'ml' : 'glasses';

  return (
    <div className="relative h-34.5 w-34.5">
      <svg className="h-34.5 w-34.5" viewBox="0 0 138 138" aria-hidden="true">
        <circle cx="69" cy="69" r="52" fill="none" className="stroke-track" strokeWidth={11} />
        <circle
          cx="69"
          cy="69"
          r="52"
          fill="none"
          className={strokeClass}
          strokeWidth={11}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '69px 69px',
            transition: 'stroke-dashoffset .55s cubic-bezier(.4,0,.2,1)',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={`${isMl ? 'text-title' : 'text-display'} font-semibold leading-none`}>
          {current.toLocaleString('en-US')}
        </p>
        <p className="text-xs font-medium text-muted">{unitLabel}</p>
      </div>
    </div>
  );
}
