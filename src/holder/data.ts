export interface EventData {
  id: string;
  title: string;
  artist: string;
  price: string;
  date: string;
  location: string;
  image: string;
  tag: string;
  description: string;
  themeColor: string; // Hex color for backgrounds/accents
}

export const EVENTS: EventData[] = [
  {
    id: "gd",
    title: "위버멘쉬:Ubermensch",
    artist: "지드래곤",
    price: "220,000 원",
    date: "2026.01.04 · 20:00",
    location: "고양종합운동장",
    image: "/images/GD.png",
    tag: "K-POP",
    description: `지드래곤의 2026 월드투어 Ubermensch는 오랜 공백 이후 선보이는 솔로 아티스트로서의 귀환 무대입니다.
신곡과 대표 히트곡을 아우르는 셋리스트와 강렬한 퍼포먼스, 감각적인 비주얼 연출이 결합된 공연으로 지드래곤만의 예술 세계와 메시지를 무대 위에서 완성합니다.`,
    themeColor: "#C5E0B4", // Light green from the screenshot
  },
  {
    id: "iu",
    title: "러브 포엠",
    artist: "아이유",
    price: "155,000 원",
    date: "2026.02.05 · 21:00",
    location: "올림픽체조경기장",
    image: "/images/IU.png",
    tag: "K-POP",
    description: "아이유의 감성적인 보이스와 함께하는 잊지 못할 밤.",
    themeColor: "#E0C5B4", // Beige/Peach tone
  },
  {
    id: "im",
    title: "별빛 같은 순간",
    artist: "임영웅",
    price: "165,000 원",
    date: "2026.03.28 · 20:00",
    location: "고척스카이돔",
    image: "/images/IM.png",
    tag: "TROT",
    description: "임영웅과 영웅시대가 함께 만들어가는 별빛 축제.",
    themeColor: "#B4C5E0", // Light Blue tone
  },
  {
    id: "straykids",
    title: "몬스터",
    artist: "스트레이키즈",
    price: "145,000 원",
    date: "2026.04.01 · 21:00",
    location: "블루스퀘어 마스터카드홀",
    image: "/images/straykids.png",
    tag: "K-POP",
    description: "스트레이키즈의 폭발적인 에너지를 느낄 수 있는 콘서트.",
    themeColor: "#B4B4B4", // Grey tone
  },
];

export function getEventById(id: string | undefined): EventData | undefined {
  return EVENTS.find((event) => event.id === id);
}
