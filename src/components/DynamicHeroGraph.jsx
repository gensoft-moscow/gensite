import { useEffect, useMemo, useRef } from 'react'

const WIDTH = 680
const HEIGHT = 660

const layerConfigs = [
  {
    className: 'dynamic-graph-back',
    maxDistance: 180,
    speed: 0.009,
    nodes: [[70, 620], [190, 555], [95, 440], [265, 475], [155, 335], [330, 375], [225, 225], [385, 260], [300, 125], [455, 70]],
  },
  {
    className: 'dynamic-graph-middle',
    maxDistance: 205,
    speed: 0.011,
    nodes: [[345, 645], [515, 585], [610, 465], [450, 415], [580, 300], [405, 245], [550, 145], [370, 70], [625, 35]],
  },
  {
    className: 'dynamic-graph-front',
    maxDistance: 190,
    speed: 0.013,
    nodes: [[150, 625], [310, 585], [475, 620], [230, 480], [405, 455], [150, 345], [320, 315], [505, 340], [245, 190], [425, 165], [335, 30]],
  },
]

function getPairs(length) {
  const pairs = []

  for (let start = 0; start < length; start += 1) {
    for (let end = start + 1; end < length; end += 1) {
      pairs.push([start, end])
    }
  }

  return pairs
}

function createPoints(config, layerIndex) {
  return config.nodes.map(([x, y], index) => {
    const angle = (index * 2.17) + (layerIndex * 1.31)

    return {
      x,
      y,
      vx: Math.cos(angle) * config.speed,
      vy: Math.sin(angle) * config.speed,
      phaseX: index * 0.73 + layerIndex,
      phaseY: index * 1.13 + layerIndex * 0.6,
    }
  })
}

function DynamicHeroGraph() {
  const svgRef = useRef(null)
  const nodeRefs = useRef([])
  const edgeRefs = useRef([])
  const pairsByLayer = useMemo(
    () => layerConfigs.map((config) => getPairs(config.nodes.length)),
    [],
  )

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointsByLayer = layerConfigs.map(createPoints)
    let animationFrame
    let previousTime = performance.now()

    const render = (time) => {
      const delta = Math.min(time - previousTime, 32)
      previousTime = time

      pointsByLayer.forEach((points, layerIndex) => {
        const config = layerConfigs[layerIndex]
        const nodeElements = nodeRefs.current[layerIndex]
        const edgeElements = edgeRefs.current[layerIndex]

        points.forEach((point, pointIndex) => {
          if (!reduceMotion) {
            const noiseX = Math.sin(time * 0.00019 + point.phaseX) * 0.000018
            const noiseY = Math.cos(time * 0.00017 + point.phaseY) * 0.000018
            point.vx += noiseX * delta
            point.vy += noiseY * delta

            const velocity = Math.hypot(point.vx, point.vy)
            const maxVelocity = config.speed * 1.55
            if (velocity > maxVelocity) {
              point.vx = (point.vx / velocity) * maxVelocity
              point.vy = (point.vy / velocity) * maxVelocity
            }

            point.x += point.vx * delta
            point.y += point.vy * delta

            const margin = 24
            if (point.x < margin || point.x > WIDTH - margin) {
              point.vx *= -1
              point.x = Math.max(margin, Math.min(WIDTH - margin, point.x))
            }
            if (point.y < margin || point.y > HEIGHT - margin) {
              point.vy *= -1
              point.y = Math.max(margin, Math.min(HEIGHT - margin, point.y))
            }
          }

          const node = nodeElements?.[pointIndex]
          node?.setAttribute('cx', point.x.toFixed(2))
          node?.setAttribute('cy', point.y.toFixed(2))
        })

        pairsByLayer[layerIndex].forEach(([startIndex, endIndex], edgeIndex) => {
          const start = points[startIndex]
          const end = points[endIndex]
          const edge = edgeElements?.[edgeIndex]
          if (!edge) return

          const distance = Math.hypot(end.x - start.x, end.y - start.y)
          const fadeStart = config.maxDistance * 0.68
          const opacity = Math.max(
            0,
            Math.min(1, (config.maxDistance - distance) / (config.maxDistance - fadeStart)),
          )

          edge.setAttribute('x1', start.x.toFixed(2))
          edge.setAttribute('y1', start.y.toFixed(2))
          edge.setAttribute('x2', end.x.toFixed(2))
          edge.setAttribute('y2', end.y.toFixed(2))
          edge.style.opacity = opacity.toFixed(3)
        })
      })

      if (!reduceMotion) animationFrame = window.requestAnimationFrame(render)
    }

    render(previousTime)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [pairsByLayer])

  return (
    <div className="graph-field dynamic-graph-field" aria-hidden="true">
      <svg
        className="dynamic-hero-graph"
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="presentation"
      >
        {layerConfigs.map((config, layerIndex) => (
          <g className={`dynamic-graph-layer ${config.className}`} key={config.className}>
            <g className="dynamic-graph-edges">
              {pairsByLayer[layerIndex].map(([startIndex, endIndex], edgeIndex) => (
                <line
                  key={`${startIndex}-${endIndex}`}
                  ref={(element) => {
                    if (!edgeRefs.current[layerIndex]) edgeRefs.current[layerIndex] = []
                    edgeRefs.current[layerIndex][edgeIndex] = element
                  }}
                />
              ))}
            </g>
            <g className="dynamic-graph-nodes">
              {config.nodes.map(([x, y], nodeIndex) => (
                <circle
                  key={nodeIndex}
                  ref={(element) => {
                    if (!nodeRefs.current[layerIndex]) nodeRefs.current[layerIndex] = []
                    nodeRefs.current[layerIndex][nodeIndex] = element
                  }}
                  cx={x}
                  cy={y}
                  r={nodeIndex % 4 === 0 ? 3.4 : 2.2}
                  style={{ '--node-delay': `${layerIndex * 0.18 + nodeIndex * 0.065}s` }}
                />
              ))}
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default DynamicHeroGraph
