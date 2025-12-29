import type { Language } from "@/constants/translations";

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

// Data Store with localized strings
const EVENTS_DATA = [
    {
        id: "EVT-2026-001",
        status: "ACTIVE",
        date: "2026.05.20 - 2026.05.22",
        location: "Seoul Olympic Stadium",
        attendees: { total: 50000, checkedIn: 12420 },
        revenue: 452000000,
        en: {
            name: "Neon Nights Festival 2026",
            description: "The biggest electronic music festival in Seoul, returned for 2026.",
        },
        ko: {
            name: "네온 나이츠 페스티벌 2026",
            description: "2026년 서울에서 가장 큰 일렉트로닉 음악 페스티벌이 돌아왔습니다.",
        }
    },
    {
        id: "EVT-2026-002",
        status: "ACTIVE",
        date: "2026.05.21 - 2026.05.24",
        location: "BEXCO Busan",
        attendees: { total: 80000, checkedIn: 45000 },
        revenue: 890000000,
        en: {
            name: "Global Game Con 2026",
            description: "Experience the future of gaming with VR demos and e-sports finals.",
        },
        ko: {
            name: "글로벌 게임 콘 2026",
            description: "VR 데모와 e스포츠 결승전으로 게임의 미래를 경험하세요.",
        }
    },
    {
        id: "EVT-2026-003",
        status: "ACTIVE",
        date: "2026.05.22",
        location: "Yeouido Park",
        attendees: { total: 5000, checkedIn: 3200 },
        revenue: 75000000,
        en: {
            name: "Spring Jazz Picnic",
            description: "Relaxing jazz performances under the cherry blossoms.",
        },
        ko: {
            name: "봄 재즈 피크닉",
            description: "벗꽃 아래에서 즐기는 편안한 재즈 공연.",
        }
    },
    // --- COMPLETED EVENTS ---
    {
        id: "EVT-2025-001",
        status: "COMPLETED",
        date: "2025.07.15 - 2025.07.17",
        location: "Han River Park",
        attendees: { total: 12500, checkedIn: 12100 },
        revenue: 350000000,
        en: {
            name: "Summer Beer Festival 2025",
            description: "Craft beer and street food festival by the river.",
        },
        ko: {
            name: "2025 썸머 맥주 페스티벌",
            description: "한강에서 즐기는 크래프트 맥주와 길거리 음식 축제.",
        }
    },
    // ... (Adding generic translations for others to save space but maintaining structure)
    {
        id: "EVT-2025-002",
        status: "COMPLETED",
        date: "2025.06.10 - 2025.06.12",
        location: "DDP",
        attendees: { total: 8000, checkedIn: 7500 },
        revenue: 210000000,
        en: { name: "Tech Startup Week 2025", description: "Connecting investors with the hottest new startups." },
        ko: { name: "테크 스타트업 위크 2025", description: "투자자와 가장 핫한 스타트업을 연결합니다." }
    },
    {
        id: "EVT-2025-003",
        status: "COMPLETED",
        date: "2025.04.05 - 2025.04.09",
        location: "KINTEX",
        attendees: { total: 45000, checkedIn: 42000 },
        revenue: 1200000000,
        en: { name: "Seoul Auto Salon 2025", description: "Showcasing the latest in automotive technology." },
        ko: { name: "2025 서울 오토 살롱", description: "최신 자동차 기술과 튜닝을 선보입니다." }
    },
    {
        id: "EVT-2025-004",
        status: "COMPLETED",
        date: "2025.03.15 - 2025.03.18",
        location: "COEX",
        attendees: { total: 20000, checkedIn: 18500 },
        revenue: 450000000,
        en: { name: "K-Food Expo", description: "Global exhibition of Korean cuisine." },
        ko: { name: "K-푸드 엑스포", description: "한국 음식의 글로벌 전시회." }
    },
    {
        id: "EVT-2024-001",
        status: "COMPLETED",
        date: "2024.12.20 - 2024.12.25",
        location: "Seoul Plaza",
        attendees: { total: 30000, checkedIn: 28000 },
        revenue: 600000000,
        en: { name: "Winter Wonderland Market", description: "Christmas market featuring handmade crafts." },
        ko: { name: "윈터 원더랜드 마켓", description: "수공예품과 맛있는 음식이 있는 크리스마스 마켓." }
    },
    {
        id: "EVT-2024-002",
        status: "COMPLETED",
        date: "2024.10.12 - 2024.10.16",
        location: "COEX",
        attendees: { total: 15000, checkedIn: 14200 },
        revenue: 180000000,
        en: { name: "International Book Fair", description: "Where publishers and readers meet." },
        ko: { name: "국제 도서전", description: "출판사와 독자가 만나는 곳." }
    },
    {
        id: "EVT-2024-003",
        status: "COMPLETED",
        date: "2024.09.05 - 2024.09.07",
        location: "SETEC",
        attendees: { total: 10000, checkedIn: 9800 },
        revenue: 150000000,
        en: { name: "Pet Care Show 2024", description: "Everything for your furry friends." },
        ko: { name: "2024 펫 케어 쇼", description: "반려동물을 위한 모든 것." }
    },
    {
        id: "EVT-2024-004",
        status: "COMPLETED",
        date: "2024.08.20",
        location: "Hongdae Street",
        attendees: { total: 5000, checkedIn: 4800 },
        revenue: 50000000,
        en: { name: "Indie Music Marathon", description: "Non-stop live performances." },
        ko: { name: "인디 뮤직 마라톤", description: "끊임없는 라이브 공연." }
    },
    {
        id: "EVT-2024-005",
        status: "COMPLETED",
        date: "2024.05.10 - 2024.05.13",
        location: "AT Center",
        attendees: { total: 25000, checkedIn: 23500 },
        revenue: 300000000,
        en: { name: "Coffee & Tea Fair", description: "Experience world-class barista championships." },
        ko: { name: "커피 & 티 페어", description: "세계적인 바리스타 챔피언십을 경험하세요." }
    },
    {
        id: "EVT-2024-006",
        status: "COMPLETED",
        date: "2024.02.14",
        location: "Yongsan I-Park",
        attendees: { total: 2000, checkedIn: 2000 },
        revenue: 30000000,
        en: { name: "Retro Gaming Night", description: "A nostalgic night of arcade classics." },
        ko: { name: "레트로 게이밍 나이트", description: "아케이드 고전 게임과 함께하는 향수의 밤." }
    }
] as const;

// Helper to get events in specific language
export const getEvents = (lang: Language): EventData[] => {
    return EVENTS_DATA.map(event => ({
        id: event.id,
        status: event.status as "ACTIVE" | "COMPLETED" | "UPCOMING",
        date: event.date,
        location: event.location,
        attendees: event.attendees,
        revenue: event.revenue,
        name: lang === 'ko' ? event.ko.name : event.en.name,
        description: lang === 'ko' ? event.ko.description : event.en.description,
    }));
};

// Default export for backward compatibility (defaults to English)
export const EVENTS = getEvents('en');


// Analytics Data with Localization
const ANALYTICS_DATA = {
    "EVT-2026-001": {
        en: {
            topZones: ["Main Stage", "Food Court", "Merch Store", "Chill Zone"],
            items: ["VIP Upgrade", "Official T-Shirt", "Light Stick"]
        },
        ko: {
            topZones: ["메인 스테이지", "푸드 코트", "굿즈 스토어", "휴식 존"],
            items: ["VIP 업그레이드", "공식 티셔츠", "응원봉"]
        },
        base: {
            avgDwellTime: "3h 45m",
            topZonesPct: [45, 25, 15, 15],
            recentPurchasesPrices: [50000, 35000, 15000],
            trafficFlow: [{ time: "10:00", count: 150 }, { time: "11:00", count: 450 }, { time: "12:00", count: 1200 }, { time: "13:00", count: 800 }]
        }
    },
    "EVT-2026-002": {
        en: {
            topZones: ["Esports Arena", "Indie Game Zone", "VR Experience", "Retro Arcade"],
            items: ["Gaming Mouse", "Character Figure", "Steam Gift Card", "Keyboard"]
        },
        ko: {
            topZones: ["e스포츠 아레나", "인디 게임 존", "VR 체험관", "레트로 오락실"],
            items: ["게이밍 마우스", "캐릭터 피규어", "스팀 기프트 카드", "키보드"]
        },
        base: {
            avgDwellTime: "5h 20m",
            topZonesPct: [55, 20, 15, 10],
            recentPurchasesPrices: [85000, 45000, 25000, 120000],
            trafficFlow: [{ time: "10:00", count: 300 }, { time: "11:00", count: 800 }, { time: "12:00", count: 2500 }]
        }
    },
    "EVT-2026-003": {
        en: {
            topZones: ["Picnic Zone", "Acoustic Stage", "Wine Bar", "Lake View"],
            items: ["Wine Glass", "Cheese Plate", "Picnic Mat", "LP Record"]
        },
        ko: {
            topZones: ["피크닉 존", "어쿠스틱 무대", "와인 바", "호수 전망대"],
            items: ["와인 잔", "치즈 플레이트", "피크닉 매트", "LP 레코드"]
        },
        base: {
            avgDwellTime: "2h 10m",
            topZonesPct: [40, 30, 20, 10],
            recentPurchasesPrices: [12000, 25000, 18000, 45000],
            trafficFlow: [{ time: "14:00", count: 100 }, { time: "15:00", count: 300 }, { time: "16:00", count: 500 }]
        }
    },
    "EVT-2025-001": {
        en: {
            topZones: ["Beer Garden", "Food Trucks", "Picnic Area"],
            aiInsights: [
                { title: "Top Demographic", description: "Women in their 30s showed the highest engagement, accounting for 42% of total attendees." },
                { title: "Consumption Trend", description: "Men in their 40s purchased 'Cass Beer' 3.5x more than other groups. Potential for targeted ad campaigns." },
                { title: "Food Preference", description: "Women in their 20s had the highest purchase rate for 'French Fries'. Suggest collaboration with potato snack brands." }
            ]
        },
        ko: {
            topZones: ["비어 가든", "푸드 트럭", "피크닉 존"],
            aiInsights: [
                { title: "주요 인구 통계", description: "30대 여성의 참여도가 가장 높았으며, 전체 관람객의 42%를 차지했습니다." },
                { title: "소비 트렌드", description: "40대 남성이 '카스 맥주'를 다른 그룹보다 3.5배 더 많이 구매했습니다. 타겟 광고 캠페인 가능성이 있습니다." },
                { title: "음식 선호도", description: "20대 여성이 '감자튀김' 구매율이 가장 높았습니다. 감자 스낵 브랜드와의 협업을 제안합니다." }
            ]
        },
        base: {
            avgDwellTime: "4h 10m",
            topZonesPct: [50, 30, 20],
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
        }
    }
};

export const getAnalytics = (eventId: string, lang: Language): AnalyticsData | null => {
    // Try to get specific data
    const data = ANALYTICS_DATA[eventId as keyof typeof ANALYTICS_DATA];

    // Default Generics if missing
    const defaultTopZones = lang === 'ko' ? ["메인 스테이지", "푸드 코트", "휴식 존", "입구"] : ["Main Stage", "Food Court", "Chill Zone", "Entrance"];
    const defaultItems = lang === 'ko' ? ["기본 티켓", "음료 쿠폰", "간식 세트"] : ["Standard Ticket", "Drink Token", "Snack Set"];

    // Define a common interface for localized data to satisfy TS
    interface LocalizedData {
        topZones: string[];
        items?: string[];
        aiInsights?: { title: string; description: string; }[];
    }

    const localized: LocalizedData = (data && (lang === 'ko' ? data.ko : data.en)) || {
        topZones: defaultTopZones,
        items: defaultItems,
        aiInsights: []
    };

    // Explicitly type base to allow optional chartData
    const base = data?.base || {
        avgDwellTime: "2h 30m",
        topZonesPct: [40, 30, 20, 10],
        recentPurchasesPrices: [15000, 8000, 12000],
        trafficFlow: [{ time: "10:00", count: 100 }, { time: "12:00", count: 300 }],
        chartData: undefined
    };

    // Ensure chartData exists (Active events might not have it, but Completed should)
    // If chartData is missing, generate generic data so it doesn't crash
    const chartData = base.chartData || {
        revenueByCategory: [
            { name: lang === 'ko' ? "티켓" : "Tickets", value: 50000000, color: "bg-blue-500" },
            { name: lang === 'ko' ? "음식" : "Food", value: 30000000, color: "bg-orange-500" },
            { name: lang === 'ko' ? "굿즈" : "Merch", value: 20000000, color: "bg-purple-500" }
        ],
        beerSales: [
            { name: "Cass", count: 500, color: "bg-blue-400" },
            { name: "Terra", count: 400, color: "bg-green-500" },
            { name: "Kelly", count: 300, color: "bg-amber-400" }
        ],
        hourlyTraffic: [
            { time: "10 AM", count: 100 }, { time: "12 PM", count: 300 }, { time: "2 PM", count: 500 },
            { time: "4 PM", count: 800 }, { time: "6 PM", count: 600 }, { time: "8 PM", count: 400 }
        ]
    };

    return {
        eventId,
        avgDwellTime: base.avgDwellTime,
        topZones: localized.topZones.map((name, i) => ({ name, percentage: base.topZonesPct[i] || 10 })),
        recentPurchases: (base.recentPurchasesPrices || [10000]).map((amount, i) => ({
            id: `TX-${Math.random().toString(36).substr(2, 5)}`,
            item: localized.items ? localized.items[i % localized.items.length] : (defaultItems[i % defaultItems.length]),
            amount,
            time: "10:00"
        })),
        trafficFlow: base.trafficFlow || [],
        aiInsights: localized.aiInsights?.map((insight, i) => ({
            ...insight,
            icon: ["users", "beer", "trending"][i % 3] as any
        })) || [],
        chartData
    };
};

// Deprecated default export
export const ANALYTICS: Record<string, AnalyticsData> = {
    "EVT-2025-001": getAnalytics("EVT-2025-001", 'en')!
};
