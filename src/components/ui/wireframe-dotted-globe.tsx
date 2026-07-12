import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface RotatingEarthProps {
  className?: string;
}

const LAND_URL = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json';

const PRESENCE_POINTS = [
  { name: 'Hyderabad', coordinates: [78.4867, 17.385] as [number, number], tone: 'hq' },
  { name: 'USA', coordinates: [-98.58, 39.83] as [number, number], tone: 'market' },
  { name: 'Canada', coordinates: [-106.35, 56.13] as [number, number], tone: 'market' },
  { name: 'United Kingdom', coordinates: [-3.44, 55.38] as [number, number], tone: 'market' },
  { name: 'Central Europe', coordinates: [10.45, 51.17] as [number, number], tone: 'market' },
  { name: 'UAE', coordinates: [53.85, 23.42] as [number, number], tone: 'market' },
  { name: 'Oman', coordinates: [55.98, 21.47] as [number, number], tone: 'market' },
  { name: 'Nairobi, Kenya', coordinates: [36.82, -1.29] as [number, number], tone: 'office' },
  { name: 'Addis Ababa, Ethiopia', coordinates: [38.76, 8.98] as [number, number], tone: 'office' },
  { name: 'Nigeria', coordinates: [8.68, 9.08] as [number, number], tone: 'market' },
  { name: 'South Africa', coordinates: [22.93, -30.56] as [number, number], tone: 'market' },
  { name: 'Colombo, Sri Lanka', coordinates: [79.86, 6.93] as [number, number], tone: 'office' },
  { name: 'Singapore', coordinates: [103.82, 1.35] as [number, number], tone: 'market' },
  { name: 'Malaysia', coordinates: [109.7, 4.21] as [number, number], tone: 'market' },
  { name: 'Australia', coordinates: [133.77, -25.27] as [number, number], tone: 'market' },
];

export default function RotatingEarth({ className = '' }: RotatingEarthProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let stopped = false;
    let land: GeoJSON.FeatureCollection | null = null;
    let dots: [number, number][] = [];
    let width = 0;
    let height = 0;
    let baseRadius = 0;
    let rotation: [number, number, number] = [-76, -12, 0];
    let autoRotate = true;
    let isVisible = false;

    const projection = d3.geoOrthographic();
    const path = d3.geoPath(projection, context);
    const graticule = d3.geoGraticule10();

    const render = () => {
      context.clearRect(0, 0, width, height);
      const radius = projection.scale();

      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      const ocean = context.createRadialGradient(width * 0.42, height * 0.35, radius * 0.05, width / 2, height / 2, radius);
      ocean.addColorStop(0, '#102B4D');
      ocean.addColorStop(0.58, '#08182A');
      ocean.addColorStop(1, '#040A12');
      context.fillStyle = ocean;
      context.fill();

      context.save();
      context.beginPath();
      context.arc(width / 2, height / 2, radius - 1, 0, Math.PI * 2);
      context.clip();
      const light = context.createRadialGradient(
        width / 2 - radius * 0.38, height / 2 - radius * 0.42, 0,
        width / 2 - radius * 0.2, height / 2 - radius * 0.24, radius * 1.35,
      );
      light.addColorStop(0, 'rgba(147,197,253,0.18)');
      light.addColorStop(0.34, 'rgba(59,130,246,0.035)');
      light.addColorStop(0.74, 'rgba(0,0,0,0.12)');
      light.addColorStop(1, 'rgba(0,0,0,0.58)');
      context.fillStyle = light;
      context.fillRect(width / 2 - radius, height / 2 - radius, radius * 2, radius * 2);
      context.restore();
      context.strokeStyle = 'rgba(96,165,250,0.5)';
      context.lineWidth = 1.2;
      context.stroke();

      context.beginPath();
      path(graticule);
      context.strokeStyle = 'rgba(96,165,250,0.12)';
      context.lineWidth = 0.65;
      context.stroke();

      if (!land) return;
      context.beginPath();
      path(land as d3.GeoPermissibleObjects);
      context.strokeStyle = 'rgba(96,165,250,0.32)';
      context.lineWidth = 0.75;
      context.stroke();

      for (const dot of dots) {
        const projected = projection(dot);
        if (!projected || d3.geoDistance(dot, projection.invert?.([width / 2, height / 2]) ?? [0, 0]) > Math.PI / 2) continue;
        context.beginPath();
        context.arc(projected[0], projected[1], Math.max(0.8, radius / 260), 0, Math.PI * 2);
        context.fillStyle = 'rgba(96,165,250,0.78)';
        context.fill();
      }

      const globeCenter = projection.invert?.([width / 2, height / 2]) ?? [0, 0];
      const pulse = 7 + ((performance.now() / 650) % 1) * 7;
      const placedLabels: Array<{ left: number; top: number; right: number; bottom: number }> = [];
      for (const [pointIndex, point] of PRESENCE_POINTS.entries()) {
        const projected = projection(point.coordinates);
        if (!projected || d3.geoDistance(point.coordinates, globeCenter) >= Math.PI / 2) continue;

        const color = point.tone === 'hq' ? '#FACC15' : point.tone === 'office' ? '#38BDF8' : '#60A5FA';
        context.beginPath();
        context.arc(projected[0], projected[1], pulse, 0, Math.PI * 2);
        context.strokeStyle = point.tone === 'hq' ? 'rgba(250,204,21,0.34)' : 'rgba(96,165,250,0.24)';
        context.lineWidth = 1;
        context.stroke();

        context.beginPath();
        context.moveTo(projected[0], projected[1] + 8);
        context.lineTo(projected[0] - 4.2, projected[1] + 1);
        context.arc(projected[0], projected[1], 4.2, Math.PI, 0);
        context.closePath();
        context.fillStyle = color;
        context.shadowColor = color;
        context.shadowBlur = point.tone === 'hq' ? 16 : 10;
        context.fill();
        context.shadowBlur = 0;

        context.beginPath();
        context.arc(projected[0], projected[1], 1.45, 0, Math.PI * 2);
        context.fillStyle = '#FFFFFF';
        context.fill();

        context.font = `700 ${width < 520 ? 8 : 9}px Manrope, sans-serif`;
        context.textBaseline = 'middle';
        const labelWidth = context.measureText(point.name).width + 14;
        const labelHeight = 20;
        const preferRight = pointIndex % 2 === 0;
        let labelX = preferRight ? projected[0] + 9 : projected[0] - labelWidth - 9;
        let labelY = projected[1] - labelHeight / 2;

        labelX = Math.max(6, Math.min(width - labelWidth - 6, labelX));
        labelY = Math.max(6, Math.min(height - labelHeight - 6, labelY));

        for (let attempt = 0; attempt < 5; attempt += 1) {
          const box = { left: labelX, top: labelY, right: labelX + labelWidth, bottom: labelY + labelHeight };
          const overlaps = placedLabels.some((placed) => !(
            box.right + 3 < placed.left || box.left - 3 > placed.right
            || box.bottom + 3 < placed.top || box.top - 3 > placed.bottom
          ));
          if (!overlaps) break;
          labelY += attempt % 2 === 0 ? labelHeight + 3 : -(labelHeight * 2 + 6);
          labelY = Math.max(6, Math.min(height - labelHeight - 6, labelY));
        }

        placedLabels.push({ left: labelX, top: labelY, right: labelX + labelWidth, bottom: labelY + labelHeight });

        context.beginPath();
        context.moveTo(projected[0], projected[1]);
        context.lineTo(preferRight ? labelX : labelX + labelWidth, labelY + labelHeight / 2);
        context.strokeStyle = point.tone === 'hq' ? 'rgba(250,204,21,0.55)' : 'rgba(96,165,250,0.42)';
        context.lineWidth = 0.75;
        context.stroke();

        context.fillStyle = 'rgba(4,10,18,0.88)';
        context.fillRect(labelX, labelY, labelWidth, labelHeight);
        context.strokeStyle = point.tone === 'hq' ? 'rgba(250,204,21,0.42)' : 'rgba(96,165,250,0.28)';
        context.strokeRect(labelX, labelY, labelWidth, labelHeight);
        context.fillStyle = point.tone === 'hq' ? '#FDE68A' : '#E0F2FE';
        context.fillText(point.name, labelX + 7, labelY + labelHeight / 2 + 0.5);
      }
    };

    const resize = () => {
      width = Math.max(280, host.clientWidth);
      height = Math.min(640, Math.max(360, width * 0.68));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseRadius = Math.min(width, height) * 0.41;
      projection.scale(baseRadius).translate([width / 2, height / 2]).clipAngle(90).rotate(rotation);
      render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { rootMargin: '120px 0px', threshold: 0.01 },
    );
    visibilityObserver.observe(host);

    fetch(LAND_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load map');
        return response.json();
      })
      .then((data: GeoJSON.FeatureCollection) => {
        if (stopped) return;
        land = data;
        for (let lng = -180; lng <= 180; lng += 3) {
          for (let lat = -82; lat <= 84; lat += 3) {
            if (data.features.some((feature) => d3.geoContains(feature, [lng, lat]))) dots.push([lng, lat]);
          }
        }
        setIsLoading(false);
        render();
      })
      .catch(() => { if (!stopped) { setError(true); setIsLoading(false); } });

    let lastFrame = 0;
    const timer = d3.timer((elapsed) => {
      if (!autoRotate || !land || !isVisible || document.hidden) return;
      if (elapsed - lastFrame < 22) return;
      lastFrame = elapsed;
      rotation = [rotation[0] + 0.1, rotation[1], 0];
      projection.rotate(rotation);
      render();
    });

    const pointerDown = (event: PointerEvent) => {
      autoRotate = false;
      canvas.setPointerCapture(event.pointerId);
      const start = [event.clientX, event.clientY];
      const initial = [...rotation] as [number, number, number];
      const move = (moveEvent: PointerEvent) => {
        rotation = [initial[0] + (moveEvent.clientX - start[0]) * 0.35, Math.max(-70, Math.min(70, initial[1] - (moveEvent.clientY - start[1]) * 0.3)), 0];
        projection.rotate(rotation);
        render();
      };
      const up = () => {
        canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('pointerup', up);
        window.setTimeout(() => { autoRotate = true; }, 900);
      };
      canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerup', up);
    };
    canvas.addEventListener('pointerdown', pointerDown);

    return () => {
      stopped = true;
      timer.stop();
      observer.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener('pointerdown', pointerDown);
    };
  }, []);

  return (
    <div ref={hostRef} className={`relative w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full cursor-grab touch-none active:cursor-grabbing" aria-label="Interactive rotating globe showing Sai Enterprises' global presence" />
      {isLoading && <div className="absolute inset-0 grid place-items-center text-[10px] font-bold uppercase tracking-[0.24em] text-blue-300/60">Loading global network…</div>}
      {error && <div className="absolute inset-0 grid place-items-center text-sm text-white/50">Global map is temporarily unavailable.</div>}
    </div>
  );
}
