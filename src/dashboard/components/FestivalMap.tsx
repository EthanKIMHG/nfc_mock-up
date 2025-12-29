import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

interface Zone {
    name: string;
    percentage: number;
}

interface FestivalMapProps {
    eventId: string;
    zones: Zone[];
    onZoneClick?: (zoneName: string) => void;
    selectedZoneName?: string;
}

export function FestivalMap({ eventId, zones, onZoneClick, selectedZoneName }: FestivalMapProps) {
    const { t } = useLanguage();

    // Color Logic Helper
    const getColor = (pct: number) => {
        if (pct > 80) return "#ef4444"; // Red
        if (pct > 60) return "#f97316"; // Orange
        if (pct > 40) return "#eab308"; // Yellow
        return "#22c55e"; // Green
    };

    // 1. NEON NIGHTS (Stadium Layout)
    if (eventId === "EVT-2026-001") {
        return (
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl select-none">
                {/* Stadium Base */}
                <ellipse cx="400" cy="300" rx="350" ry="250" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" strokeDasharray="10 10" />

                {/* Main Stage (Top) -> Index 0 */}
                <ZonePath
                    d="M 250 150 Q 400 80 550 150 L 520 250 Q 400 280 280 250 Z"
                    zone={zones[0]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[0]?.name || "")}
                    isSelected={selectedZoneName === zones[0]?.name}
                    label={zones[0]?.name || t('zone.main_stage')}
                />

                {/* Food Court (Right Arc) -> Index 1 */}
                <ZonePath
                    d="M 600 200 Q 700 300 600 400 L 550 350 Q 620 300 550 250 Z"
                    zone={zones[1]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[1]?.name || "")}
                    isSelected={selectedZoneName === zones[1]?.name}
                    label={zones[1]?.name || t('zone.food_court')}
                />

                {/* Chill Zone (Left Arc) -> Index 3 (based on data.ts structure) */}
                <ZonePath
                    d="M 200 200 Q 100 300 200 400 L 250 350 Q 180 300 250 250 Z"
                    zone={zones[3]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[3]?.name || "")}
                    isSelected={selectedZoneName === zones[3]?.name}
                    label={zones[3]?.name || t('zone.chill_zone')}
                />

                {/* Merch Store (Bottom) -> Index 2 */}
                <ZonePath
                    d="M 300 450 Q 400 500 500 450 L 500 520 Q 400 550 300 520 Z"
                    zone={zones[2]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[2]?.name || "")}
                    isSelected={selectedZoneName === zones[2]?.name}
                    label={zones[2]?.name || t('zone.merch_store')}
                />
            </svg>
        );
    }

    // 2. GLOBAL GAME CON (Convention Center Layout)
    if (eventId === "EVT-2026-002") {
        return (
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl select-none">
                <rect x="50" y="50" width="700" height="500" rx="20" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" />

                {/* Demo Zone (Left) -> Index 2 (VR/Demo) */}
                <ZonePath
                    d="M 80 80 L 380 80 L 380 380 L 80 380 Z"
                    zone={zones[2]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[2]?.name || "")}
                    isSelected={selectedZoneName === zones[2]?.name}
                    label={zones[2]?.name || t('zone.demo_zone')}
                />

                {/* E-Sports Arena (Right) -> Index 0 */}
                <ZonePath
                    d="M 420 80 L 720 80 L 720 380 L 420 380 Z"
                    zone={zones[0]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[0]?.name || "")}
                    isSelected={selectedZoneName === zones[0]?.name}
                    label={zones[0]?.name || t('zone.esports')}
                />

                {/* Indie Corner (Bottom) -> Index 1 */}
                <ZonePath
                    d="M 80 420 L 720 420 L 720 520 L 80 520 Z"
                    zone={zones[1]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[1]?.name || "")}
                    isSelected={selectedZoneName === zones[1]?.name}
                    label={zones[1]?.name || t('zone.indie')}
                />
            </svg>
        );
    }

    // 3. SPRING JAZZ PICNIC (Park Layout)
    if (eventId === "EVT-2026-003") {
         return (
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl select-none">
                <path d="M 0 100 Q 400 0 800 100" stroke="#3B82F6" strokeWidth="4" fill="none" opacity="0.3" />

                {/* Picnic Grass -> Index 0 */}
                <ZonePath
                    d="M 100 200 Q 400 150 700 200 Q 750 400 600 500 Q 400 550 200 500 Q 50 400 100 200 Z"
                    zone={zones[0]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[0]?.name || "")}
                    isSelected={selectedZoneName === zones[0]?.name}
                    label={zones[0]?.name || t('zone.picnic')}
                />

                {/* Food Trucks -> Index 2 (Wine/Food) */}
                <ZonePath
                    d="M 150 520 L 650 520 L 650 580 L 150 580 Z"
                    zone={zones[2]}
                    getColor={getColor}
                    onClick={() => onZoneClick?.(zones[2]?.name || "")}
                    isSelected={selectedZoneName === zones[2]?.name}
                    label={zones[2]?.name || t('zone.food_trucks')}
                />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] drop-shadow-2xl">
            <rect x="100" y="100" width="600" height="400" stroke="white" fill="none" opacity="0.1" />
            <text x="400" y="300" textAnchor="middle" fill="white" opacity="0.5">{t('dash.map_unavailable')}</text>
        </svg>
    );
}

function ZonePath({ d, zone, getColor, onClick, isSelected, label }: any) {
    if (!zone) return null; // Safe guard
    const color = getColor(zone.percentage);

    return (
        <g 
            className="group transition-all duration-300 cursor-pointer" 
            onClick={onClick}
            style={{ opacity: isSelected ? 1 : 0.8 }}
        >
            <motion.path
                d={d}
                initial={{ fill: `${color}20` }}
                animate={{
                    fill: `${color}40`,
                    filter: isSelected 
                        ? `drop-shadow(0 0 15px ${color})` 
                        : `drop-shadow(0 0 ${zone.percentage / 10}px ${color}40)`,
                    strokeWidth: isSelected ? 3 : 1
                }}
                stroke={isSelected ? "#FFF" : color}
                whileHover={{ scale: 1.02, strokeWidth: 2, fill: `${color}60` }}
            />
            {/* Label Background */}
            <rect
                x={getCenter(d).x - 40}
                y={getCenter(d).y - 15}
                width="80"
                height="30"
                rx="4"
                fill="rgba(0,0,0,0.7)"
                stroke={isSelected ? color : "transparent"}
                className="pointer-events-none transition-colors"
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
