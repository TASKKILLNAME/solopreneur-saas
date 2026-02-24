// Mock data for demo mode (when Supabase is not configured)

export const mockClients = [
  {
    id: "c1",
    user_id: "demo",
    company_name: "테크스타트 주식회사",
    contact_name: "김민수",
    email: "minsu@techstart.kr",
    phone: "010-1234-5678",
    address: "서울시 강남구 역삼동 123",
    business_registration_number: "123-45-67890",
    notes: "웹 개발 프로젝트 주요 고객",
    status: "active",
    created_at: "2025-12-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "c2",
    user_id: "demo",
    company_name: "디자인랩",
    contact_name: "이서연",
    email: "seoyeon@designlab.co",
    phone: "010-9876-5432",
    address: "서울시 마포구 합정동 456",
    business_registration_number: "234-56-78901",
    notes: "UI/UX 디자인 협업",
    status: "active",
    created_at: "2025-11-15T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "c3",
    user_id: "demo",
    company_name: "그린에너지",
    contact_name: "박지훈",
    email: "jihoon@greenenergy.kr",
    phone: "010-5555-1234",
    address: "경기도 성남시 분당구",
    business_registration_number: "",
    notes: "",
    status: "inactive",
    created_at: "2025-09-01T00:00:00Z",
    updated_at: "2025-12-20T00:00:00Z",
  },
]

export const mockProjects = [
  {
    id: "p1",
    user_id: "demo",
    client_id: "c1",
    name: "테크스타트 웹사이트 리뉴얼",
    description: "기존 워드프레스 사이트를 Next.js로 마이그레이션",
    status: "in_progress",
    start_date: "2026-01-15",
    end_date: "2026-03-31",
    budget: 15000000,
    hourly_rate: 80000,
    clients: { company_name: "테크스타트 주식회사" },
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "p2",
    user_id: "demo",
    client_id: "c2",
    name: "디자인랩 관리자 대시보드",
    description: "내부 관리용 대시보드 개발",
    status: "planning",
    start_date: "2026-03-01",
    end_date: "2026-04-30",
    budget: 8000000,
    hourly_rate: 70000,
    clients: { company_name: "디자인랩" },
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-15T00:00:00Z",
  },
  {
    id: "p3",
    user_id: "demo",
    client_id: "c1",
    name: "모바일 앱 API 개발",
    description: "React Native 앱을 위한 REST API 설계 및 구현",
    status: "completed",
    start_date: "2025-10-01",
    end_date: "2025-12-31",
    budget: 12000000,
    hourly_rate: 80000,
    clients: { company_name: "테크스타트 주식회사" },
    created_at: "2025-10-01T00:00:00Z",
    updated_at: "2026-01-05T00:00:00Z",
  },
]

export const mockTasks = [
  { id: "t1", user_id: "demo", project_id: "p1", title: "디자인 시안 검토", is_completed: true, sort_order: 0, due_date: "2026-01-20", description: "", created_at: "", updated_at: "" },
  { id: "t2", user_id: "demo", project_id: "p1", title: "프론트엔드 컴포넌트 개발", is_completed: true, sort_order: 1, due_date: "2026-02-15", description: "", created_at: "", updated_at: "" },
  { id: "t3", user_id: "demo", project_id: "p1", title: "백엔드 API 연동", is_completed: false, sort_order: 2, due_date: "2026-03-01", description: "", created_at: "", updated_at: "" },
  { id: "t4", user_id: "demo", project_id: "p1", title: "QA 테스트 및 배포", is_completed: false, sort_order: 3, due_date: "2026-03-20", description: "", created_at: "", updated_at: "" },
]

export const mockInvoices = [
  {
    id: "inv1",
    user_id: "demo",
    client_id: "c1",
    project_id: "p3",
    invoice_number: "INV-2026-001",
    status: "paid",
    issue_date: "2026-01-05",
    due_date: "2026-01-20",
    subtotal: 12000000,
    tax_rate: 10,
    tax_amount: 1200000,
    total: 13200000,
    notes: "모바일 앱 API 개발 완료 건",
    payment_date: "2026-01-18",
    clients: { company_name: "테크스타트 주식회사", email: "billing@techstart.kr", address: "서울시 강남구 역삼동 123", business_registration_number: "123-45-67890" },
    invoice_items: [
      { id: "ii1", description: "API 설계 및 문서화", quantity: 1, unit_price: 3000000, amount: 3000000, sort_order: 0 },
      { id: "ii2", description: "API 엔드포인트 개발 (40시간)", quantity: 40, unit_price: 80000, amount: 3200000, sort_order: 1 },
      { id: "ii3", description: "테스트 및 디버깅", quantity: 1, unit_price: 2800000, amount: 2800000, sort_order: 2 },
      { id: "ii4", description: "배포 및 운영 지원", quantity: 1, unit_price: 3000000, amount: 3000000, sort_order: 3 },
    ],
    created_at: "2026-01-05T00:00:00Z",
    updated_at: "2026-01-18T00:00:00Z",
  },
  {
    id: "inv2",
    user_id: "demo",
    client_id: "c1",
    project_id: "p1",
    invoice_number: "INV-2026-002",
    status: "sent",
    issue_date: "2026-02-15",
    due_date: "2026-03-01",
    subtotal: 5000000,
    tax_rate: 10,
    tax_amount: 500000,
    total: 5500000,
    notes: "웹사이트 리뉴얼 1차 중간금",
    payment_date: null,
    clients: { company_name: "테크스타트 주식회사", email: "billing@techstart.kr", address: "서울시 강남구 역삼동 123", business_registration_number: "123-45-67890" },
    invoice_items: [
      { id: "ii5", description: "프론트엔드 개발 (1차)", quantity: 50, unit_price: 80000, amount: 4000000, sort_order: 0 },
      { id: "ii6", description: "디자인 적용", quantity: 1, unit_price: 1000000, amount: 1000000, sort_order: 1 },
    ],
    created_at: "2026-02-15T00:00:00Z",
    updated_at: "2026-02-15T00:00:00Z",
  },
]

export const mockTimeEntries = [
  { id: "te1", user_id: "demo", project_id: "p1", task_id: null, description: "헤더/네비게이션 컴포넌트 개발", start_time: "2026-02-23T09:00:00Z", end_time: "2026-02-23T12:30:00Z", duration_minutes: 210, is_billable: true, hourly_rate: 80000, projects: { name: "테크스타트 웹사이트 리뉴얼" }, created_at: "", updated_at: "" },
  { id: "te2", user_id: "demo", project_id: "p1", task_id: null, description: "메인 페이지 레이아웃", start_time: "2026-02-23T14:00:00Z", end_time: "2026-02-23T17:00:00Z", duration_minutes: 180, is_billable: true, hourly_rate: 80000, projects: { name: "테크스타트 웹사이트 리뉴얼" }, created_at: "", updated_at: "" },
  { id: "te3", user_id: "demo", project_id: "p1", task_id: null, description: "반응형 디자인 수정", start_time: "2026-02-22T10:00:00Z", end_time: "2026-02-22T13:00:00Z", duration_minutes: 180, is_billable: true, hourly_rate: 80000, projects: { name: "테크스타트 웹사이트 리뉴얼" }, created_at: "", updated_at: "" },
  { id: "te4", user_id: "demo", project_id: "p2", task_id: null, description: "요구사항 분석 미팅", start_time: "2026-02-21T14:00:00Z", end_time: "2026-02-21T15:30:00Z", duration_minutes: 90, is_billable: false, hourly_rate: 70000, projects: { name: "디자인랩 관리자 대시보드" }, created_at: "", updated_at: "" },
]

export const mockTransactions = [
  { id: "tr1", user_id: "demo", project_id: "p3", invoice_id: "inv1", type: "income", category: "프로젝트 수입", description: "청구서 INV-2026-001 결제", amount: 13200000, transaction_date: "2026-01-18", projects: { name: "모바일 앱 API 개발" }, created_at: "", updated_at: "" },
  { id: "tr2", user_id: "demo", project_id: null, invoice_id: null, type: "expense", category: "소프트웨어/구독", description: "Vercel Pro 월간 구독", amount: 25000, transaction_date: "2026-02-01", projects: null, created_at: "", updated_at: "" },
  { id: "tr3", user_id: "demo", project_id: null, invoice_id: null, type: "expense", category: "소프트웨어/구독", description: "Figma 월간 구독", amount: 18000, transaction_date: "2026-02-01", projects: null, created_at: "", updated_at: "" },
  { id: "tr4", user_id: "demo", project_id: null, invoice_id: null, type: "expense", category: "교육/도서", description: "온라인 강의 수강료", amount: 59000, transaction_date: "2026-02-10", projects: null, created_at: "", updated_at: "" },
  { id: "tr5", user_id: "demo", project_id: null, invoice_id: null, type: "income", category: "컨설팅 수입", description: "기술 컨설팅 (2시간)", amount: 300000, transaction_date: "2026-02-12", projects: null, created_at: "", updated_at: "" },
]

export const mockProfile = {
  id: "demo",
  full_name: "홍길동",
  business_name: "길동 개발 스튜디오",
  email: "demo@solobiz.kr",
  phone: "010-1234-5678",
  address: "서울시 강남구",
  business_registration_number: "111-22-33333",
  bank_name: "카카오뱅크",
  bank_account: "3333-01-1234567",
  logo_url: null,
  default_hourly_rate: 80000,
  currency: "KRW",
  created_at: "2025-06-01T00:00:00Z",
  updated_at: "2026-02-20T00:00:00Z",
}

export function getMockDashboardData() {
  const monthlyRevenue = 13500000
  const activeProjects = 1
  const pendingInvoiceCount = 1
  const pendingTotal = 5500000
  const weeklyHours = 11

  const chartData = [
    { month: "9월", revenue: 0 },
    { month: "10월", revenue: 3500000 },
    { month: "11월", revenue: 4200000 },
    { month: "12월", revenue: 5800000 },
    { month: "1월", revenue: 13200000 },
    { month: "2월", revenue: 300000 },
  ]

  return {
    monthlyRevenue,
    activeProjects,
    pendingInvoiceCount,
    pendingTotal,
    weeklyHours,
    recentProjects: mockProjects.slice(0, 5),
    pendingInvoices: mockInvoices.filter((i) => i.status === "sent"),
    chartData,
  }
}

export function getMockFinancialSummary() {
  return {
    monthlyIncome: 300000,
    monthlyExpense: 102000,
    monthlyNet: 198000,
    yearlyIncome: 13500000,
    yearlyExpense: 402000,
    yearlyNet: 13098000,
    chartData: [
      { month: "3월", income: 0, expense: 35000 },
      { month: "4월", income: 0, expense: 42000 },
      { month: "5월", income: 0, expense: 38000 },
      { month: "6월", income: 0, expense: 35000 },
      { month: "7월", income: 0, expense: 25000 },
      { month: "8월", income: 0, expense: 43000 },
      { month: "9월", income: 0, expense: 35000 },
      { month: "10월", income: 3500000, expense: 48000 },
      { month: "11월", income: 4200000, expense: 35000 },
      { month: "12월", income: 5800000, expense: 52000 },
      { month: "1월", income: 13200000, expense: 43000 },
      { month: "2월", income: 300000, expense: 102000 },
    ],
  }
}
