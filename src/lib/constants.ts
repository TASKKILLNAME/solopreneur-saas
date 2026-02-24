export const PROJECT_STATUS = {
  planning: "기획 중",
  in_progress: "진행 중",
  on_hold: "보류",
  completed: "완료",
  cancelled: "취소",
} as const

export const CLIENT_STATUS = {
  active: "활성",
  inactive: "비활성",
  archived: "보관",
} as const

export const INVOICE_STATUS = {
  draft: "임시저장",
  sent: "발송됨",
  paid: "결제완료",
  overdue: "연체",
  cancelled: "취소",
} as const

export const TRANSACTION_CATEGORIES = {
  income: [
    "프로젝트 수입",
    "컨설팅 수입",
    "기타 수입",
  ],
  expense: [
    "소프트웨어/구독",
    "장비/하드웨어",
    "교통비",
    "식비",
    "사무용품",
    "교육/도서",
    "세금/보험",
    "기타 비용",
  ],
} as const

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  planning: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  on_hold: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export const INVOICE_STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  sent: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  paid: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  overdue: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  cancelled: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}
