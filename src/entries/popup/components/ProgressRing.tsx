const CIRCUMFERENCE = 2 * Math.PI * 52;

interface ProgressRingProps {
  glasses: number;
  goal: number;
  color?: string;
}

export default function ProgressRing({ glasses, goal, color }: ProgressRingProps) {
  const progress = Math.min(1, glasses / goal);
  const offset = CIRCUMFERENCE * (1 - progress);
  const strokeClass = color ?? 'stroke-primary';

  return (
    <div className="relative h-34.5 w-34.5">
      <svg className="h-34.5 w-34.5" viewBox="0 0 138 138">
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
        <p className="text-[30px] font-semibold leading-none">
          <span>{glasses}</span>
          <span className="font-medium text-muted">
            /<span>{goal}</span>
          </span>
        </p>
        <p className="text-xs font-medium text-muted">glasses</p>
      </div>
    </div>
  );
}
