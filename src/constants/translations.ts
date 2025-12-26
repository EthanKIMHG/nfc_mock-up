export type Language = 'en' | 'ko';

export const translations = {
  en: {
    // POS / Scan Modes
    'mode.entrance': 'Entrance',
    'mode.payment': 'Payment',
    'mode.checkin': 'Check-In',

    // Scan Status
    'status.idle': 'Ready to Scan',
    'status.scanning': 'Scanning...',
    'status.signing': 'Signing...',
    'status.verifying': 'Verifying...',
    'status.success': 'Success',
    'status.error': 'Error',

    // Scan Actions
    'scan.tap': 'Tap to Scan',
    'scan.guide': 'Hold device near NFC tag',
    'scan.scan_complete': 'Scan Complete',
    'scan.signature_valid': 'Signature Valid',
    'scan.payload_inspector': 'Payload Inspector',
    'scan.signature_required': 'Signature Required',
    'scan.signature_guide': 'Please ask the user to sign to verify identity.',
    'scan.signature_pad': '[ SIGNATURE PAD AREA ]',
    'scan.confirm_signature': 'Confirm Signature',
    'scan.verified_blockchain': 'Verified',
    'scan.verifying_credentials': 'Verifying Credentials...',
    'scan.searching_nfc': 'Searching for NFC...',
    'scan.access_denied': 'Access Denied',
    'scan.invalid_ticket': 'Invalid Ticket or User',
    'scan.scan_ticket': 'SCAN TICKET',
    'scan.accept_payment': 'ACCEPT PAYMENT',
    'scan.hold_device': "Hold device near guest's phone or card",

    // Dashboard
    'dashboard.term': 'Term',
    'dashboard.capacity': 'Current Capacity',
    'dashboard.total_attendees': 'Total Attendees',
    'dashboard.checked_in': 'Checked In',
    'dashboard.view_policy': 'View Event Information policy',

    // Event Info (Policies)
    'policy.ticket_collection': 'Ticket Collection',
    'policy.ticket_collection_desc': 'Tickets can be collected at the venue ticket booth.',
    'policy.bring_id': 'Please bring a valid photo ID.',
    'policy.booth_open': 'Ticket booth opens 2 hours before the event.',

    'policy.age_policy': 'Age Policy',
    'policy.adults_only': 'This event is restricted to adults only.',
    'policy.min_age': 'Entry is permitted for guests aged 19 and over.',
    'policy.no_minors': 'Minors will not be admitted under any circumstances, even if accompanied by a guardian.',

    'policy.important_info': 'Important Info',
    'policy.info_1': 'Age policy follows ticket provider guidelines.',
    'policy.info_2': 'ID may be required upon entry.',
    'policy.info_3': 'Filming and photography subject to venue rules.',
    'policy.info_4': 'By completing your purchase, you agree to all policies listed above.',

    'common.back': 'Back',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'result.success_desc': 'Transaction has been successfully confirmed.',
    'result.payment_success_desc': 'Payment has been successfully processed.',

    // Dashboard - Sidebar
    'dash.nav.overview': 'Overview',
    'dash.nav.history': 'Event History',
    'dash.nav.settings': 'Settings',
    'dash.admin_title': 'NFC Admin',
    'dash.user.name': 'Admin User',
    'dash.user.role': 'Super Admin',
    'dash.select_event': 'Select Event',
    'dash.choose_event': 'Choose an event to manage entry',
    'dash.event_admin': 'Event Admin',
    'dash.recent_activity': 'Recent Activity',
    'dash.live_status': 'LIVE',
    'dash.live_now_badge': 'LIVE NOW',
    'dash.upcoming_badge': 'UPCOMING',

    // Dashboard - Header
    'dash.search': 'Event Search',
    'dash.login': 'Login',

    // Dashboard - Main Page
    'dash.title': 'Discover Events',
    'dash.subtitle': 'Monitor real-time audience flow or review past event performance.',
    'dash.live_now': 'Live Now',
    'dash.view_all': 'View All',
    'dash.past_events': 'Past Events',
    'dash.no_events': 'No events found.',
    // Dashboard - Details
    'dash.back': 'Back to List',
    'dash.revenue': 'Total Revenue',
    'dash.live_updates': 'Live Updates',
    'dash.attendees': 'Current Attendees',
    'dash.capacity': 'Capacity',
    'dash.transactions': 'Live Transactions',
    'dash.waiting_tx': 'Waiting for transactions...',
    'dash.density_map': 'Live Crowd Density Map',
    'dash.updating': 'Updating Real-time',
    'dash.map_unavailable': 'Map Data Unavailable',

    // Map Zones
    'zone.main_stage': 'MAIN STAGE',
    'zone.food_court': 'FOOD COURT',
    'zone.chill_zone': 'CHILL ZONE',
    'zone.merch_store': 'MERCH STORE',
    'zone.demo_zone': 'DEMO ZONE A',
    'zone.esports': 'E-SPORTS ARENA',
    'zone.indie': 'INDIE CORNER',
    'zone.picnic': 'PICNIC GRASS',
    'zone.food_trucks': 'FOOD TRUCKS',

    // Completed Event & Charts
    'dash.view_ai': 'View AI Analysis',
    'dash.total_attendees_cap': 'TOTAL ATTENDEES',
    'dash.total_revenue_cap': 'TOTAL REVENUE',
    'dash.avg_spend': 'AVG. SPEND',
    'dash.best_selling': '🍺 Best Selling Brands',
    'dash.sold': 'sold',
    'dash.revenue_mix': 'Revenue Mix',
    'dash.hourly_footfall': 'Hourly Footfall',

    // AI Report
    'dash.ai_title': 'NFC Admin AI Analysis',
    'dash.post_event_report': 'Post-Event Report',
    'dash.generated_on': 'Generated on',
    'dash.key_insights': 'Key Strategic Insights',
    'dash.summary': 'Summary',
    'dash.confidential': 'CONFIDENTIAL DOCUMENT • FOR INTERNAL USE ONLY',
    'dash.download_pdf': 'Download PDF',
    'dash.download_xls': 'Download XLS',
    'dash.report_unavailable': 'Report not available',
  },
  ko: {
    // POS / Scan Modes
    'mode.entrance': '입장 (Entrance)',
    'mode.payment': '결제 (Payment)',
    'mode.checkin': '체크인',

    // Scan Status
    'status.idle': '스캔 대기중',
    'status.scanning': '스캔중...',
    'status.signing': '서명중...',
    'status.verifying': '검증중...',
    'status.success': '성공',
    'status.error': '오류',

    // Scan Actions
    'scan.tap': '탭하여 스캔',
    'scan.guide': 'NFC 태그에 기기를 가까이 대세요',
    'scan.scan_complete': '스캔 완료',
    'scan.signature_valid': '서명 유효',
    'scan.payload_inspector': '페이로드 검사기',
    'scan.signature_required': '서명 필요',
    'scan.signature_guide': '본인 확인을 위해 서명을 요청하세요.',
    'scan.signature_pad': '[ 서명 패드 영역 ]',
    'scan.confirm_signature': '서명 확인',
    'scan.verified_blockchain': '검증 완료',
    'scan.verifying_credentials': '자격 증명 검증중...',
    'scan.searching_nfc': 'NFC 검색중...',
    'scan.access_denied': '접근 거부됨',
    'scan.invalid_ticket': '유효하지 않은 티켓 또는 사용자',
    'scan.scan_ticket': '티켓 스캔',
    'scan.accept_payment': '결제 접수',
    'scan.hold_device': '고객의 휴대폰이나 카드에 단말기를 가까이 대세요',

    // Result Drawer
    'result.success': '인증 성공',
    'result.access_granted': '입장 허용',
    'result.boarding_pass': '탑승권',
    'result.payment_success': '결제 성공',
    'result.success_desc': '거래가 성공적으로 확인되었습니다.',
    'result.payment_success_desc': '결제가 성공적으로 처리되었습니다.',

    // Dashboard
    'dashboard.term': '단말기',
    'dashboard.capacity': '현재 입장 현황',
    'dashboard.total_attendees': '총 예매자',
    'dashboard.checked_in': '입장 완료',
    'dashboard.view_policy': '이벤트 정보 및 정책 보기',

    // Event Info (Policies)
    'policy.ticket_collection': '티켓 수령 안내',
    'policy.ticket_collection_desc': '티켓은 행사장 티켓 부스에서 수령 가능합니다.',
    'policy.bring_id': '유효한 신분증을 반드시 지참해주세요.',
    'policy.booth_open': '티켓 부스는 공연 2시간 전부터 운영됩니다.',

    'policy.age_policy': '연령 제한 안내',
    'policy.adults_only': '본 공연은 성인 전용 행사입니다.',
    'policy.min_age': '만 19세 이상만 입장 가능합니다.',
    'policy.no_minors': '미성년자는 보호자 동반 시에도 입장 불가합니다.',

    'policy.important_info': '중요 안내사항',
    'policy.info_1': '연령 정책은 예매처 규정을 따릅니다.',
    'policy.info_2': '입장 시 신분증 확인이 요구될 수 있습니다.',
    'policy.info_3': '공연장 내 촬영 규정을 준수해주세요.',
    'policy.info_4': '구매 시 위 모든 정책에 동의한 것으로 간주됩니다.',

    'common.back': '뒤로가기',
    'common.confirm': '확인',
    'common.close': '닫기',

    // Dashboard - Sidebar
    'dash.nav.overview': '대시보드',
    'dash.nav.history': '이벤트 히스토리',
    'dash.nav.settings': '설정',
    'dash.admin_title': 'NFC 관리자',
    'dash.user.name': '관리자',
    'dash.user.role': '슈퍼 어드민',
    'dash.select_event': '이벤트 선택',
    'dash.choose_event': '관리할 이벤트를 선택하세요',
    'dash.event_admin': '이벤트 관리자',
    'dash.recent_activity': '최근 활동',
    'dash.live_status': 'LIVE',
    'dash.live_now_badge': '진행중',
    'dash.upcoming_badge': '예정됨',

    // Dashboard - Header
    'dash.search': '이벤트 검색',
    'dash.login': '로그인',

    // Dashboard - Main Page
    'dash.title': '이벤트 탐색',
    'dash.subtitle': '실시간 관객 흐름을 모니터링하거나 지난 성과를 분석하세요.',
    'dash.live_now': '진행중인 행사',
    'dash.view_all': '모두 보기',
    'dash.past_events': '지난 행사',
    'dash.no_events': '이벤트가 없습니다.',

    // Dashboard - Details
    'dash.back': '목록으로',
    'dash.revenue': '총 매출',
    'dash.live_updates': '실시간 업데이트',
    'dash.attendees': '현재 입장객',
    'dash.capacity': '입장률',
    'dash.transactions': '실시간 결제',
    'dash.waiting_tx': '결제 대기중...',
    'dash.density_map': '실시간 군중 밀도 맵',
    'dash.updating': '실시간 갱신중',
    'dash.map_unavailable': '지도 데이터 없음',

    // Map Zones
    'zone.main_stage': '메인 스테이지',
    'zone.food_court': '푸드 코트',
    'zone.chill_zone': '휴식 존',
    'zone.merch_store': '굿즈 스토어',
    'zone.demo_zone': '데모 존 A',
    'zone.esports': 'E-스포츠 아레나',
    'zone.indie': '인디 코너',
    'zone.picnic': '피크닉 잔디',
    'zone.food_trucks': '푸드 트럭',

    // Completed Event & Charts
    'dash.view_ai': 'AI 분석 보기',
    'dash.total_attendees_cap': '총 입장객',
    'dash.total_revenue_cap': '총 매출',
    'dash.avg_spend': '평균 지출액',
    'dash.best_selling': '🍺 인기 브랜드',
    'dash.sold': '판매됨',
    'dash.revenue_mix': '매출 구성',
    'dash.hourly_footfall': '시간대별 유동인구',

    // AI Report
    'dash.ai_title': 'NFC 관리자 AI 분석',
    'dash.post_event_report': '이벤트 결과 보고서',
    'dash.generated_on': '생성일',
    'dash.key_insights': '주요 전략적 인사이트',
    'dash.summary': '요약',
    'dash.confidential': '대외비 • 내부용 문서입니다',
    'dash.download_pdf': 'PDF 다운로드',
    'dash.download_xls': 'XLS 다운로드',
    'dash.report_unavailable': '보고서를 찾을 수 없습니다',
  }
};
