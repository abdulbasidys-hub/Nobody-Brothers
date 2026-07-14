export default function App() {
  return (
    <div style={styles.page}>
      {/* drifting background shapes */}
      <Shapes />

      <main style={styles.center}>
        <div style={{ ...styles.sceneWrap, animationDelay: '0.15s' }}>
          <Scene />
        </div>

        <h1 style={{ ...styles.title, animationDelay: '0.3s' }}>
          We&apos;ll Be Back Shortly
        </h1>

        <p style={{ ...styles.copy, animationDelay: '0.42s' }}>
          We&apos;re currently carrying out scheduled maintenance to improve
          your experience and make our platform faster, safer, and more
          reliable. The website will be available again soon.
          Thank you for your patience.
        </p>
      </main>
    </div>
  )
}

/* Two robot "brothers" turning a gear */
function Scene() {
  return (
    <svg viewBox="0 0 360 190" width="100%" height="100%" role="img"
         aria-label="Two robots performing maintenance">
      {/* gear behind */}
      <g className="gear" style={{ transformOrigin: '180px 78px' }}>
        <Gear cx={180} cy={78} r={30} />
      </g>

      {/* ground */}
      <line x1="40" y1="165" x2="320" y2="165" stroke="#d9d7d2"
            strokeWidth="2" strokeDasharray="4 7" />

      {/* left brother */}
      <g className="bob-a">
        <Robot x={92} y={92} body="#d8d5cf" face="#1c1c1e" />
      </g>

      {/* right brother (accent) with wrench */}
      <g className="bob-b">
        <Robot x={210} y={92} body="#c9432b" face="#1c1c1e" />
        <g className="wrench">
          <rect x="276" y="118" width="6" height="34" rx="3" fill="#6b6b70" />
          <circle cx="279" cy="116" r="8" fill="none" stroke="#6b6b70" strokeWidth="6" />
        </g>
      </g>
    </svg>
  )
}

function Gear({ cx, cy, r }) {
  const teeth = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * Math.PI) / 4
    const tx = cx + Math.cos(a) * (r + 6)
    const ty = cy + Math.sin(a) * (r + 6)
    return (
      <rect key={i} x={tx - 5} y={ty - 5} width="10" height="10"
            fill="#1c1c20"
            transform={`rotate(${(i * 45)} ${tx} ${ty})`} />
    )
  })
  return (
    <g>
      {teeth}
      <circle cx={cx} cy={cy} r={r} fill="#141417" stroke="#26262b" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={9} fill="#0b0b0c" stroke="#26262b" strokeWidth="2" />
    </g>
  )
}

function Robot({ x, y, body, face }) {
  return (
    <g>
      {/* antenna */}
      <line x1={x + 29} y1={y - 4} x2={x + 29} y2={y - 16}
            stroke="#74747a" strokeWidth="2" />
      <circle className="antenna" cx={x + 29} cy={y - 18} r="4" fill="var(--accent)" />
      {/* head/body */}
      <rect x={x} y={y - 4} width="58" height="60" rx="12"
            fill={body} />
      {/* face plate */}
      <rect x={x + 8} y={y + 6} width="42" height="24" rx="7" fill={face} />
      {/* eyes (blink) */}
      <g className="blink">
        <rect x={x + 16} y={y + 13} width="8" height="9" rx="3" fill="#c9432b" />
        <rect x={x + 34} y={y + 13} width="8" height="9" rx="3" fill="#c9432b" />
      </g>
      {/* mouth */}
      <rect x={x + 20} y={y + 40} width="18" height="4" rx="2" fill={face} />
      {/* legs */}
      <rect x={x + 12} y={y + 56} width="8" height="16" rx="3" fill={body} />
      <rect x={x + 38} y={y + 56} width="8" height="16" rx="3" fill={body} />
    </g>
  )
}

/* floating background shapes */
function Shapes() {
  const items = [
    { left: '8%',  size: 14, dur: 16, delay: 0,  type: 'sq' },
    { left: '22%', size: 8,  dur: 22, delay: 4,  type: 'ci' },
    { left: '40%', size: 18, dur: 19, delay: 9,  type: 'tri' },
    { left: '58%', size: 10, dur: 24, delay: 2,  type: 'ci' },
    { left: '74%', size: 15, dur: 17, delay: 7,  type: 'sq' },
    { left: '88%', size: 9,  dur: 21, delay: 12, type: 'tri' },
  ]
  return (
    <div style={styles.shapeLayer}>
      {items.map((s, i) => {
        const common = {
          left: s.left,
          bottom: '-40px',
          animationDuration: `${s.dur}s`,
          animationDelay: `${s.delay}s`,
        }
        if (s.type === 'ci') {
          return (
            <span key={i} className="shape" style={{
              ...common,
              width: s.size, height: s.size, borderRadius: '50%',
              border: '2px solid var(--accent)',
            }} />
          )
        }
        if (s.type === 'tri') {
          return (
            <span key={i} className="shape" style={{
              ...common,
              width: 0, height: 0,
              borderLeft: `${s.size / 2}px solid transparent`,
              borderRight: `${s.size / 2}px solid transparent`,
              borderBottom: `${s.size}px solid #cfccc5`,
            }} />
          )
        }
        return (
          <span key={i} className="shape" style={{
            ...common,
            width: s.size, height: s.size,
            border: '2px solid #cfccc5',
          }} />
        )
      })}
    </div>
  )
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    overflow: 'hidden',
  },
  shapeLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  center: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '560px',
    width: '100%',
  },
  sceneWrap: {
    width: '100%',
    maxWidth: '360px',
    margin: '20px auto 8px',
    opacity: 0,
    animation: 'fade 0.8s ease forwards',
  },
  title: {
    fontFamily: 'var(--heading)',
    fontWeight: 600,
    fontSize: 'clamp(30px, 6.5vw, 60px)',
    lineHeight: 1.05,
    letterSpacing: '-0.01em',
    color: 'var(--fg)',
    opacity: 0,
    animation: 'fade 0.8s ease forwards',
  },
  copy: {
    marginTop: '20px',
    fontFamily: 'var(--mono)',
    fontSize: '13.5px',
    lineHeight: 1.75,
    color: 'var(--muted)',
    opacity: 0,
    animation: 'fade 0.9s ease forwards',
  },
}