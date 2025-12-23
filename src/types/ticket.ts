// types/ticket.ts
export interface NFTTicket {
  id: string;             // NFT Token ID
  wristbandId: string;    // NFC H/W ID
  eventName: string;      // 행사명
  eventDate: string;      // 행사 날짜
  owner: {
    name: string;
    did: string;          // 탈중앙화 신원 ID (간략화)
    profileImage: string;
  };
  seatInfo: {
    zone: string;         // 구역 (VIP, General, Standing)
    row?: string;
    number?: string;
  };
  status: 'ACTIVE' | 'USED' | 'INVALID'; // 입장 상태
  issuedAt: string;       // 발급 일시
}