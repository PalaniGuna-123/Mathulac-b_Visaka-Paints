interface LoaderProps {
  progress?: number;
  onComplete?: () => void;
}

export function Loader({ progress = 100 }: LoaderProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="ld-root"
      role="status"
      aria-live="polite"
      aria-label={`Loading Mathulac: ${clampedProgress}%`}
    >
      <div className="ld-vignette" aria-hidden="true" />
      <div className="ld-stage">
        <p className="ld-eyebrow">
          Visaka Paints &amp; Chemicals India&nbsp;&nbsp;·&nbsp;&nbsp;ISO 9001 Certified
        </p>

        <div className="ld-logo-box">
          <img
            src="/assets/brand/mathulac-logo-nav.webp"
            alt="Mathulac"
            className="ld-logo"
            draggable={false}
          />
        </div>

        <p className="ld-tagline">Preparing your colours</p>
        <div className="ld-rule" aria-hidden="true" />

        <div className="ld-counter" aria-hidden="true">
          <span className="ld-counter-num">{Math.round(clampedProgress)}</span>
          <span className="ld-counter-pct">%</span>
        </div>

        <div
          className="ld-bar"
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="ld-bar-groove" />
          <div
            className={`ld-bar-fill${clampedProgress >= 100 ? ' ld-bar-fill--complete' : ''}`}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>

        <div className="ld-caption">
          {clampedProgress >= 100 ? (
            <span className="ld-caption-done">Colour is ready</span>
          ) : (
            <>
              <span>Loading</span>
              <span className="ld-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Loader;
