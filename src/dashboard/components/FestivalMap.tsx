import { motion } from "framer-motion";

interface Zone {
    name: string;
    percentage: number;
}

interface FestivalMapProps {
    eventId: string;
    zones: Zone[];
}

export function FestivalMap({ eventId, zones }: FestivalMapProps) {
    // 1. NEON NIGHTS (Stadium Layout)
    if (eventId === "EVT-2026-001") {
        return (
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl">
                {/* Stadium Base */}
                <ellipse cx="400" cy="300" rx="350" ry="250" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" strokeDasharray="10 10" />

                {/* Main Stage (Top) */}
                <ZonePath
                    d="M 250 150 Q 400 80 550 150 L 520 250 Q 400 280 280 250 Z"
                    color="#A855F7"
                    label="MAIN STAGE"
                    zones={zones}
                    match="Main"
                />

                {/* Food Court (Right Arc) */}
                <ZonePath
                    d="M 600 200 Q 700 300 600 400 L 550 350 Q 620 300 550 250 Z"
                    color="#F97316"
                    label="FOOD COURT"
                    zones={zones}
                    match="Food"
                />

                {/* Chill Zone (Left Arc) */}
                <ZonePath
                    d="M 200 200 Q 100 300 200 400 L 250 350 Q 180 300 250 250 Z"
                    color="#22C55E"
                    label="CHILL ZONE"
                    zones={zones}
                    match="Chill"
                />

                {/* Merch Store (Bottom) */}
                <ZonePath
                    d="M 300 450 Q 400 500 500 450 L 500 520 Q 400 550 300 520 Z"
                    color="#3B82F6"
                    label="MERCH STORE"
                    zones={zones}
                    match="Merch"
                />
            </svg>
        );
    }

    // 2. GLOBAL GAME CON (Convention Center Layout - BEXCO)
    if (eventId === "EVT-2026-002") {
        return (
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl">
                {/* Building Outline */}
                <rect x="50" y="50" width="700" height="500" rx="20" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" />

                {/* Demo Zone A (Large Hall Left) */}
                <ZonePath
                    d="M 80 80 L 380 80 L 380 380 L 80 380 Z"
                    color="#3B82F6"
                    label="DEMO ZONE A"
                    zones={zones}
                    match="Demo"
                />

                {/* E-Sports Arena (Large Hall Right) */}
                <ZonePath
                    d="M 420 80 L 720 80 L 720 380 L 420 380 Z"
                    color="#EF4444"
                    label="E-SPORTS ARENA"
                    zones={zones}
                    match="Arena"
                />

                {/* Indie Corner (Bottom Strip) */}
                <ZonePath
                    d="M 80 420 L 720 420 L 720 520 L 80 520 Z"
                    color="#EAB308"
                    label="INDIE CORNER"
                    zones={zones}
                    match="Indie"
                />
            </svg>
        );
    }

    // 3. SPRING JAZZ PICNIC (Park Layout - Yeouido)
    if (eventId === "EVT-2026-003") {
        return (
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl">
                {/* River Curve (Han River) */}
                <path d="M 0 100 Q 400 0 800 100" stroke="#3B82F6" strokeWidth="4" fill="none" opacity="0.3" />

                {/* Picnic Grass (Large Organic Area) */}
                <ZonePath
                    d="M 100 200 Q 400 150 700 200 Q 750 400 600 500 Q 400 550 200 500 Q 50 400 100 200 Z"
                    color="#4ADE80"
                    label="PICNIC GRASS"
                    zones={zones}
                    match="Picnic"
                />

                {/* Food Trucks (Roadside) */}
                <ZonePath
                    d="M 150 520 L 650 520 L 650 580 L 150 580 Z"
                    color="#F97316"
                    label="FOOD TRUCKS"
                    zones={zones}
                    match="Food"
                />
            </svg>
        );
    }

    // Fallback (Generic)
    return (
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl">
            <rect x="100" y="100" width="600" height="400" stroke="white" fill="none" opacity="0.1" />
            <text x="400" y="300" textAnchor="middle" fill="white" opacity="0.5">Map Data Unavailable</text>
        </svg>
    );
}

// Helper Sub-component for individual zones
function ZonePath({ d, color, label, zones, match }: { d: string, color: string, label: string, zones: Zone[], match: string }) {
    const zone = zones.find(z => z.name.includes(match)) || { percentage: 0 };

    // Opacity calculation: 0% -> 0.2 (min visibility), 100% -> 0.8 (strong visibility)
    // Formula: 0.2 + (percentage / 100) * 0.6
    const opacityHex = Math.min(255, Math.floor(255 * (0.2 + (zone.percentage / 100) * 0.6))).toString(16).padStart(2, '0');

    return (
        <g className="group transition-all duration-500">
            <motion.path
                d={d}
                className="cursor-pointer"
                initial={{ fill: `${color}10` }}
                animate={{
                    fill: `${color}${opacityHex}`,
                    filter: `drop-shadow(0 0 ${zone.percentage / 4}px ${color}80)`
                }}
                stroke={color}
                strokeWidth="2"
            />
            {/* Label Background for readability */}
            <rect
                x={getCenter(d).x - 40}
                y={getCenter(d).y - 15}
                width="80"
                height="30"
                rx="4"
                fill="rgba(0,0,0,0.6)"
                className="pointer-events-none"
            />
            <text
                x={getCenter(d).x}
                y={getCenter(d).y}
                textAnchor="middle"
                fill="white"
                className="text-xs font-bold pointer-events-none"
                dy="-2"
            >
                {label}
            </text>
            <text
                x={getCenter(d).x}
                y={getCenter(d).y}
                textAnchor="middle"
                fill={color}
                className="text-xs font-mono pointer-events-none"
                dy="10"
            >
                {Math.round(zone.percentage)}%
            </text>
        </g>
    );
}

// Very rough approximate center calculation for label placement
// Just takes the average of bounding boxish points from the path string
function getCenter(d: string) {
    const numbers = d.match(/[-+]?[0-9]*\.?[0-9]+/g)?.map(Number) || [];
    if (numbers.length === 0) return { x: 0, y: 0 };

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < numbers.length; i += 2) {
        if (numbers[i] < minX) minX = numbers[i];
        if (numbers[i] > maxX) maxX = numbers[i];
        if (i + 1 < numbers.length) {
            if (numbers[i + 1] < minY) minY = numbers[i + 1];
            if (numbers[i + 1] > maxY) maxY = numbers[i + 1];
        }
    }

    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}
