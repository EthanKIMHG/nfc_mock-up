export interface EventData {
    id: string;
    name: string;
    status: "ACTIVE" | "COMPLETED" | "UPCOMING";
    date: string;
    location: string;
    attendees: {
        total: number;
        checkedIn: number;
    };
    revenue: number;
    description: string;
}

export interface AnalyticsData {
    eventId: string;
    avgDwellTime: string; // e.g., "2h 15m"
    topZones: { name: string; percentage: number }[];
    recentPurchases: {
        id: string;
        item: string;
        amount: number;
        time: string;
    }[];
    trafficFlow: {
        time: string;
        count: number;
    }[];
    aiInsights?: {
        title: string;
        description: string;
        icon: "users" | "beer" | "trending";
    }[];
    chartData?: {
        revenueByCategory: { name: string; value: number; color: string }[];
        beerSales: { name: string; count: number; color: string }[];
        hourlyTraffic: { time: string; count: number }[];
    };
}

export const EVENTS: EventData[] = [
    // --- ACTIVE EVENTS (3) ---
    {
        id: "EVT-2026-001",
        name: "Neon Nights Festival 2026",
        status: "ACTIVE",
        date: "2026.05.20 - 2026.05.22",
        location: "Seoul Olympic Stadium",
        attendees: { total: 50000, checkedIn: 12420 },
        revenue: 452000000,
        description: "The biggest electronic music festival in Seoul, returned for 2026.",
    },
    {
        id: "EVT-2026-002",
        name: "Global Game Con 2026",
        status: "ACTIVE",
        date: "2026.05.21 - 2026.05.24",
        location: "BEXCO Busan",
        attendees: { total: 80000, checkedIn: 45000 },
        revenue: 890000000,
        description: "Experience the future of gaming with VR demos and e-sports finals.",
    },
    {
        id: "EVT-2026-003",
        name: "Spring Jazz Picnic",
        status: "ACTIVE",
        date: "2026.05.22",
        location: "Yeouido Park",
        attendees: { total: 5000, checkedIn: 3200 },
        revenue: 75000000,
        description: "Relaxing jazz performances under the cherry blossoms.",
    },

    // --- COMPLETED EVENTS (10) ---
    {
        id: "EVT-2025-001",
        name: "Summer Beer Festival 2025",
        status: "COMPLETED",
        date: "2025.07.15 - 2025.07.17",
        location: "Han River Park",
        attendees: { total: 12500, checkedIn: 12100 },
        revenue: 350000000,
        description: "Craft beer and street food festival by the river.",
    },
    {
        id: "EVT-2025-002",
        name: "Tech Startup Week 2025",
        status: "COMPLETED",
        date: "2025.06.10 - 2025.06.12",
        location: "DDP (Dongdaemun Design Plaza)",
        attendees: { total: 8000, checkedIn: 7500 },
        revenue: 210000000,
        description: "Connecting investors with the hottest new startups in Asia.",
    },
    {
        id: "EVT-2025-003",
        name: "Seoul Auto Salon 2025",
        status: "COMPLETED",
        date: "2025.04.05 - 2025.04.09",
        location: "KINTEX",
        attendees: { total: 45000, checkedIn: 42000 },
        revenue: 1200000000,
        description: "Showcasing the latest in automotive technology and tuning.",
    },
    {
        id: "EVT-2025-004",
        name: "K-Food Expo",
        status: "COMPLETED",
        date: "2025.03.15 - 2025.03.18",
        location: "COEX",
        attendees: { total: 20000, checkedIn: 18500 },
        revenue: 450000000,
        description: "Global exhibition of Korean traditional and modern cuisine.",
    },
    {
        id: "EVT-2024-001",
        name: "Winter Wonderland Market",
        status: "COMPLETED",
        date: "2024.12.20 - 2024.12.25",
        location: "Seoul Plaza",
        attendees: { total: 30000, checkedIn: 28000 },
        revenue: 600000000,
        description: "Christmas market featuring handmade crafts and festive foods.",
    },
    {
        id: "EVT-2024-002",
        name: "International Book Fair",
        status: "COMPLETED",
        date: "2024.10.12 - 2024.10.16",
        location: "COEX",
        attendees: { total: 15000, checkedIn: 14200 },
        revenue: 180000000,
        description: "Where publishers and readers meet. Guest author signings available.",
    },
    {
        id: "EVT-2024-003",
        name: "Pet Care Show 2024",
        status: "COMPLETED",
        date: "2024.09.05 - 2024.09.07",
        location: "SETEC",
        attendees: { total: 10000, checkedIn: 9800 },
        revenue: 150000000,
        description: "Everything for your furry friends, from treats to tech.",
    },
    {
        id: "EVT-2024-004",
        name: " Indie Music Marathon",
        status: "COMPLETED",
        date: "2024.08.20",
        location: "Hongdae Street",
        attendees: { total: 5000, checkedIn: 4800 },
        revenue: 50000000,
        description: "Non-stop live performances by rising indie bands.",
    },
    {
        id: "EVT-2024-005",
        name: "Coffee & Tea Fair",
        status: "COMPLETED",
        date: "2024.05.10 - 2024.05.13",
        location: "AT Center",
        attendees: { total: 25000, checkedIn: 23500 },
        revenue: 300000000,
        description: "Experience world-class barista championships and tasting sessions.",
    },
    {
        id: "EVT-2024-006",
        name: "Retro Gaming Night",
        status: "COMPLETED",
        date: "2024.02.14",
        location: "Yongsan I-Park",
        attendees: { total: 2000, checkedIn: 2000 },
        revenue: 30000000,
        description: "A nostalgic night of arcade classics and console history.",
    },
];

export const ANALYTICS: Record<string, AnalyticsData> = {
    // --- ACTIVE ---
    "EVT-2026-001": {
        eventId: "EVT-2026-001",
        avgDwellTime: "3h 45m",
        topZones: [
            { name: "Main Stage", percentage: 45 },
            { name: "Food Court", percentage: 25 },
            { name: "Merch Store", percentage: 15 },
            { name: "Chill Zone", percentage: 15 },
        ],
        recentPurchases: [
            { id: "TX-991", item: "VIP Upgrade", amount: 50000, time: "10:42 AM" },
            { id: "TX-992", item: "Official T-Shirt", amount: 35000, time: "10:45 AM" },
            { id: "TX-993", item: "Light Stick", amount: 15000, time: "10:48 AM" },
        ],
        trafficFlow: [{ time: "10:00", count: 150 }, { time: "11:00", count: 450 }, { time: "12:00", count: 1200 }, { time: "13:00", count: 800 }]
    },
    "EVT-2026-002": {
        eventId: "EVT-2026-002",
        avgDwellTime: "5h 10m",
        topZones: [
            { name: "Demo Zone A", percentage: 40 },
            { name: "E-Sports Arena", percentage: 35 },
            { name: "Indie Corner", percentage: 25 },
        ],
        recentPurchases: [
            { id: "TX-G1", item: "Early Bird Pass", amount: 25000, time: "09:12 AM" },
            { id: "TX-G2", item: "Ltd Edition Figure", amount: 120000, time: "09:15 AM" },
        ],
        trafficFlow: [{ time: "09:00", count: 2000 }, { time: "10:00", count: 5000 }]
    },
    "EVT-2026-003": {
        eventId: "EVT-2026-003",
        avgDwellTime: "2h 30m",
        topZones: [
            { name: "Picnic Grass", percentage: 60 },
            { name: "Food Trucks", percentage: 40 },
        ],
        recentPurchases: [
            { id: "TX-J1", item: "Wine Glass", amount: 5000, time: "14:12" },
            { id: "TX-J2", item: "Cheese Platter", amount: 18000, time: "14:15" },
        ],
        trafficFlow: [{ time: "13:00", count: 500 }, { time: "14:00", count: 1200 }]
    },

    // --- COMPLETED ---
    "EVT-2025-001": {
        eventId: "EVT-2025-001",
        avgDwellTime: "4h 10m",
        topZones: [
            { name: "Beer Garden", percentage: 50 },
            { name: "Food Trucks", percentage: 30 },
            { name: "Picnic Area", percentage: 20 },
        ],
        recentPurchases: [],
        trafficFlow: [],
        aiInsights: [
            { title: "Top Demographic", description: "Women in their 30s showed the highest engagement, accounting for 42% of total attendees.", icon: "users" },
            { title: "Consumption Trend", description: "Men in their 40s purchased 'Cass Beer' 3.5x more than other groups. Potential for targeted ad campaigns.", icon: "beer" },
            { title: "Food Preference", description: "Women in their 20s had the highest purchase rate for 'French Fries'. Suggest collaboration with potato snack brands.", icon: "trending" }
        ],
        chartData: {
            revenueByCategory: [
                { name: "Draft Beer", value: 180000000, color: "bg-amber-500" },
                { name: "Food & Snacks", value: 120000000, color: "bg-orange-500" },
                { name: "Merchandise", value: 30000000, color: "bg-purple-500" },
                { name: "Tickets", value: 20000000, color: "bg-blue-500" }
            ],
            beerSales: [
                { name: "Cass Fresh", count: 8500, color: "bg-blue-400" },
                { name: "Terra", count: 6200, color: "bg-green-500" },
                { name: "Kelly", count: 4100, color: "bg-amber-400" },
                { name: "Asahi Super Dry", count: 3200, color: "bg-gray-400" },
                { name: "Guinness", count: 2100, color: "bg-stone-700" }
            ],
            hourlyTraffic: [
                { time: "12 PM", count: 450 }, { time: "2 PM", count: 1200 }, { time: "4 PM", count: 2800 },
                { time: "6 PM", count: 5500 }, { time: "8 PM", count: 8200 }, { time: "10 PM", count: 4100 },
            ]
        }
    },
    "EVT-2025-002": {
        eventId: "EVT-2025-002",
        avgDwellTime: "6h 15m",
        topZones: [{ name: "Main Hall", percentage: 50 }, { name: "VC Lounge", percentage: 30 }, { name: "Cafeteria", percentage: 20 }],
        recentPurchases: [], trafficFlow: [],
        chartData: {
            revenueByCategory: [{ name: "Sponsorship", value: 150000000, color: "bg-blue-600" }, { name: "Tickets", value: 50000000, color: "bg-indigo-500" }, { name: "Merch", value: 10000000, color: "bg-purple-500" }],
            beerSales: [],
            hourlyTraffic: [{ time: "09 AM", count: 1000 }, { time: "11 AM", count: 3500 }, { time: "02 PM", count: 4000 }]
        },
        aiInsights: [{ title: "Networking Focus", description: "Average dwell time in VC Lounge was 2x higher than previous year.", icon: "users" }]
    },
    // Adding generic data for the rest to prevent crashes, but keeping them simpler
    "EVT-2025-003": { eventId: "EVT-2025-003", avgDwellTime: "3h 20m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2025-004": { eventId: "EVT-2025-004", avgDwellTime: "2h 45m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2024-001": { eventId: "EVT-2024-001", avgDwellTime: "1h 30m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2024-002": { eventId: "EVT-2024-002", avgDwellTime: "4h 00m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2024-003": { eventId: "EVT-2024-003", avgDwellTime: "2h 10m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2024-004": { eventId: "EVT-2024-004", avgDwellTime: "5h 30m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2024-005": { eventId: "EVT-2024-005", avgDwellTime: "3h 15m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
    "EVT-2024-006": { eventId: "EVT-2024-006", avgDwellTime: "2h 00m", topZones: [], recentPurchases: [], trafficFlow: [], chartData: { revenueByCategory: [], beerSales: [], hourlyTraffic: [] }, aiInsights: [] },
};
